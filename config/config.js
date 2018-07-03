var mysql = require('mysql');

// 连接数据库
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database : 'mxtan'
});

var query = function (sql, callback) {
    conn.getConnection(function (err, connection) {
        connection.query(sql, function (err, request) {
            callback(err, request);
            connection.release();
        });
    });
};

exports.query = query;
