let mysql = require("mysql")
let connection = mysql.createPool({
    connectionLimit: 10000,
    host: "localhost",
    user: "root",
    password:"",
    port: 3306,
    database: "testdb"
})
module.exports = connection;