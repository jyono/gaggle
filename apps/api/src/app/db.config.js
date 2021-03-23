module.exports = {
  USER: 'postgres',     
  DB: 'test',       
  PASSWORD: 'postgres',     
  HOST: 'localhost',        
  PORT: '5432',  
  dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};

  
