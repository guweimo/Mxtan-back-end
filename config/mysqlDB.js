const mysql = require('mysql')
const dbConfig = require('./dbConfig')

// 连接数据库
const pool = mysql.createPool({
    host: 'localhost',
    user: dbConfig.user,
    password: dbConfig.password,
    database : dbConfig.database,
    acquireTimeout: 15000, // 连接超时时间
    connectionLimit: 100, // 最大连接数
    waitForConnections: true, // 超过最大连接时排队
    queueLimit: 0, // 排队最大数量(0 代表不做限制)
})

const connect = async function(sql, params, callback) {
    let result = await query(sql, params)
    return result
}

const query = function(sql, params) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                reject(err)
            }
            conn.query(sql, params, (err, res) => {
                pool.releaseConnection(conn)
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    })
}

module.require = connect
