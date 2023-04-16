module.exports = {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "admindieta",
    PASSWORD: process.env.DB_PASSWORD || "admindieta",
    DB: process.env.DB_NAME || "dietariodb",
    port: process.env.DB_PORT || "3306",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };