module.exports = (sequelize, Sequelize) => {
    const parts = sequelize.define("parts", {
      userID: {
        type: Sequelize.STRING
      },
      trackID: {
        type: Sequelize.STRING
      },
      partsType: {
        type: Sequelize.STRING
      },
      quality: {
        type: Sequelize.FLOAT
      },
      equipped: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return parts;
  };
  