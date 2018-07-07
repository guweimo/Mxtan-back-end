import mysql from 'mysql'

// 连接数据库
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database : 'mxtan'
})

db.connect()

export default db
