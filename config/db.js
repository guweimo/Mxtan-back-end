import mysql from 'mysql'

// 连接数据库
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database : 'mxtan'
})

db.connect()

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
