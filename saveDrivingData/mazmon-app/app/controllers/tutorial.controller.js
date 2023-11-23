const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;
const GPS = db.gps;
const track = db.track;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty"
    });
    return;
  }

  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// GPS POSTリクエストのハンドリング
exports.createGPS = async (req, res) => {
  const t = await db.sequelize.transaction(); // トランザクションの開始

  try {
    // Validate request
    if (!req.body || !Array.isArray(req.body.Records)) {
      res.status(400).send({
        message: "Request body should contain an array of GPS data under 'Records'."
      });
      return;
    }

    // 1レコードのユーザIDを取り出す
    const firstRecord = req.body.Records[0];
    const firstStatus = 'unused';

    const trackData = {
      userID: firstRecord.userID,
      status: firstStatus
    };

    // Save track data in the database
    const createdTrack = await track.create(trackData, { transaction: t });

    const trackIDmax = await db.track.max('id', { transaction: t });

    const gpsArray = req.body.Records.map(gpsData => {
      return {
        userID: gpsData.userID,
        trackID: trackIDmax,
        timestamp: gpsData.timestamp,
        longitude: gpsData.longitude,
        latitude: gpsData.latitude
      };
    });

    //TODO 軌跡のタイプ判定
    //TODO 軌跡の品質 判定

    // Save GPS data in the database
    const createdGPS = await GPS.bulkCreate(gpsArray, { transaction: t });

    // コミット
    await t.commit();

    // レスポンスを1回だけ送信
    res.send({
      trackData: createdTrack,
      gpsData: createdGPS
    });
  } catch (error) {
    // ロールバック
    await t.rollback();

    res.status(500).send({
      message: error.message || "Some error occurred while processing the data."
    });
  }
};