import mysql from 'mysql'

// 连接数据库
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database : 'mxtan'
})

db.connect()

// 搜索单个内容
const first = (sql, ...param) => {
    return new Promise((resolve, reject) => {
        db.query(sql, param, (err, res) => {
            if (err) {
                reject(err)
                return
            }
            resolve(res[0] || null)
        })
    })
}

// 搜索所有内容
const all = (sql, ...param) => {
    return new Promise((resolve, reject) => {
        db.query(sql, param, (err, res) => {
            if (err) {
                reject(err)
                return
            }
            resolve(res)
        })
    })
}

// 执行所有sql语句
const execute = (sql, ...param) => {
    return new Promise((resolve, reject) => {
        db.query(sql, param, (err, res) => {
            if (err) {
                reject(err)
                return
            }
            resolve(res)
        })
    })
}

export default {
    first,
    all,
    execute
}
