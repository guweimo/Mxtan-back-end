var mysql = require('mysql');

// 连接数据库
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database : 'mxtan'
});

conn.connect();

module.exports = conn;
