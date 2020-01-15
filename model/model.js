const connect = require('../config/mysqlDB')

class Model {
    constructor(table) {
        this.table = table
    }

    findAll(params) {
        let sql = `select * from ${this.table} where 1=1`

        let keys = Object.keys(params)

        let array = []
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            sql += ` and ${key}=?`
            array.push(params[key])
        }
        let result = connect(sql, array)
        return result
    }

    findAllExist(params) {
        params = Object.assign(params, {
            state: 1
        })
        let result = this.findAll(params)
        return result
    }

    findBy(params) {
        let sql = `select * from ${this.table} where 1=1`

        let keys = Object.keys(params)
        let array = []
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            sql += ` and ${key}=?`
            array.push(params[key])
        }
        let result = connect(sql, array)
        return result
    }

    find(id) {
        let params = { id: id }
        return this.findBy(params)
    }

    get(id) {
        let params = { id: id }
        return this.findBy(params)
    }

    add(params) {
        let sql = `insert into ${this.table} `

        let keys = Object.keys(params)
        let fieldSql = ''
        let valueSql = ''
        let array = []
        const question = '?'
        const symbol = ', ?'
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            if (fieldSql == '') {
                fieldSql = `${key}`
                valueSql = question
            } else {
                fieldSql += `, ${key}`
                valueSql += symbol
            }
            array.push(params[key])
        }

        sql += `(${fieldSql}) values (${valueSql})`
        let result = connect(sql, array)
        return result
    }

    update(params, idParams) {
        let sql = `update ${this.table} set`
        let keys = Object.keys(params)
        let array = []
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            sql += ` ${key}=?`
            array.push(params[key])
        }

        sql += ' where'

        let idKeys = Object.keys(idParams)
        let firstKey = idKeys[0]
        let whereSql = ` ${firstKey}=?`
        array.push(idParams[firstKey])
        for (let i = 1; i < idKeys.length; i++) {
            let key = idKeys[i]
            whereSql += ` and ${key}=?`
            array.push(idParams[key])
        }

        sql += whereSql
        let result = connect(sql, array)
        return result
    }

    delete(id) {
        let sql = `update ${this.table} SET status=3 where id=?`
        let result = connect(sql, id)
        return result
    }

    remove(id) {
        let sql = `delete from ${this.table} where id=?`
        let result = connect(sql, id)
        return result
    }

    execute(sql, params) {
        let result = connect(sql, params)
        return result
    }
}

module.exports = Model
