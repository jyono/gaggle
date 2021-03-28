module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("USERS", {
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      password: {
        type: Sequelize.STRING
      }
    },{
      tableName: 'USERS'
    });
  
    return Tutorial;
  };