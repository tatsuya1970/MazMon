const db = require("../models");
const Op = db.Sequelize.Op;
const GPS = db.gps;
const track = db.track;
const parts = db.parts;

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

// 軌跡登録
exports.createGPS = async (req, res) => {
  const t = await db.sequelize.transaction(); // トランザクションの開始

  try {
    // Validate request
    if (!req.body || !Array.isArray(req.body.Records)) {
      res.status(400).send({
        message: "Request body should contain an array of GPS data under 'Records'."
      });
      await t.rollback();
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

// パーツ生成
exports.createParts = async (req, res) => {
  const t = await db.sequelize.transaction(); // トランザクションの開始
  
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Request body should contain parts data."
      });
      await t.rollback();
      return;
    }

    // IDを取り出す
    const trackID = req.body.id || null;
    const userID = req.body.userID || null;

    // データチェック
    if (!userID || !trackID) {
      res.status(400).send({
        message: "Request body should contain 'userID' and 'trackID'."
      });
      await t.rollback();
      return;
    }

    // Find a single an id
    const foundTracks = await track.findAll({
      where: {
        id: trackID,
        status: 'unused',
      },
    });
    
    // trackIDに対応するトラックが見つからなかった場合の処理
    if (foundTracks.length === 0){
      res.status(400).send({
        message: "リクエストされた軌跡はありません"
      });
      await t.rollback();
      return;
    }
    
    const equipped = false
    const userdStatus = 'used';
    const partsData = {
      userID: userID,
      trackID: trackID,
      partsType:'tire',
      quality:99.9,
      equipped: equipped
    };

    const trackData = {
      status: userdStatus
    };

    // パーツデータInsert
    const createdParts = await parts.create(partsData, { transaction: t });

    // トラックデータ使用済みにUpdate
    const trackUpdateResult = await track.update(trackData, {
      where: { id: trackID }
    });
    
    if (trackUpdateResult[0] !== 1) {
      res.send({
        message: `Cannot update track with id=${trackID}.`
      });
    }

    // コミット
    await t.commit();

    // レスポンスを1回だけ送信
    res.send({
      partsData: createdParts
    });
  } catch (error) {
    // ロールバック
    await t.rollback();

    res.status(500).send({
      message: error.message || "Some error occurred while processing the data."
    });
  }
};

// 軌跡取得
exports.findTrackAll = (req, res) => {
  const userID = req.body.userID || null;

  // データチェック
  if (!userID) {
    res.status(400).send({
      message: "Request body should contain 'userID'"
    });
    return;
  }

  track.findAll({
    where: { userID: userID },
    status: 'unused'
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tracks."
      });
    });
};

// パーツ取得
exports.findPartsAll = (req, res) => {
  const userID = req.body.userID || null;

  // データチェック
  if (!userID) {
    res.status(400).send({
      message: "Request body should contain 'userID'"
    });
    return;
  }

  parts.findAll({
    where: { userID: userID },
    status: 'unused'
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tracks."
      });
    });
};