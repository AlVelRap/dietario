const mysql = require("mysql2")
const dbConfig = require("../config/db.config.js");

// Quizas deberia cambiar esto al modelo singleton
const conn = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig.PORT,
    multipleStatements: true,
})

conn.connect(function (err) {
    if (!err)
        console.log("Connected!")
    else
        console.log("Connection failed: "+ err)
})

module.exports = conn