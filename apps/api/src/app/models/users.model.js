module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("USERS", {
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.BOOLEAN
      },
      password: {
        type: Sequelize.BOOLEAN
      }
    },{
      tableName: 'USERS'
    });
  
    return Tutorial;
  };