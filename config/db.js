// var mysql = require('mysql');
import mysql from 'mysql'

// 连接数据库
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database : 'mxtan'
});

db.connect();

// module.exports = conn;
export default db
