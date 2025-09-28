const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'secret',
    database: 'airbnb'  // create this manually or via code
});

module.exports = pool.promise()
