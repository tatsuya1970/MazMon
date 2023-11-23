module.exports = (sequelize, Sequelize) => {
  const gps = sequelize.define("gps", {
    userID: {
      type: Sequelize.STRING
    },
    trackID: {
      type: Sequelize.STRING
    },
    timestamp: {
      type: Sequelize.DATE
    },
    longitude: {
      type: Sequelize.STRING
    },
    latitude: {
      type: Sequelize.STRING
    }
  });

  return gps;
};
