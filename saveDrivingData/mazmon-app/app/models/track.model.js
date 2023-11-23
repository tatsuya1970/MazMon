module.exports = (sequelize, Sequelize) => {
  const track = sequelize.define("track", {
    userID: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    quality: {
      type: Sequelize.FLOAT
    },
    status: {
      type: Sequelize.STRING
    }
  });

  return track;
};
