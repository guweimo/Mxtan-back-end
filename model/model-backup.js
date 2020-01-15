import db from '../config/dbConfig'

export const findNavData = () => {
    let sql = 'select * from nav where state=1'
    return db.all(sql)
}

export const loginUser = (...params) => {
    let sql = `select * from users where username=? and pass=?`
    return db.first(sql, ...params)
}

export const registerUser = (...params) => {
    let sql = `insert into users (username, pass, email, name) values (?, ?, ?, ?)`
    return db.execute(sql, ...params)
}

export const insertArticle = (...params) => {
    let sql = 'insert into article (title, description, marktext, n_id, author) values (?, ?, ?, ?, "guweimo")'
    return db.execute(sql, ...params)
}

let needField = `a.id, a.title, a.description, a.marktext, a.current_time, a.update_time, 
nav.title as type, u.name as author`

export const findPageList = (type) => {
    let andSql = type === '' ? '' : ' and a.n_id=?'

    let sql = `select ${needField} from article a 
        left join nav on nav.id = a.n_id 
        left join users u on u.username = a.author 
        where a.state=1 ${andSql}  
        order by a.current_time desc`

    return db.all(sql, type)
}

export const searchArticle = (title) => {
    let sql = `select ${needField} from article a 
        left join nav on nav.id = a.n_id
        left join users u on u.username = a.author 
        where a.state=1 and a.title=? order by a.current_time desc`
    return db.all(sql, title)
}

export const searchDetail = (id) => {
    let sql = `select ${needField} from article a 
        left join nav on nav.id = a.n_id 
        left join users u on u.username = a.author`
    let conditions = ' where a.state=1 and a.id=?'
    sql += conditions
    return db.first(sql, id)
}

export const searchUser = (...params) => {
    let sql = `select * from users where id=?`
    return db.first(sql, ...params)
}

export const firstTypeUser = (type, value) => {
    let sql = `select * from users where ${type}=?`
    return db.first(sql, value)
}

class Model {
    constructor(table) {
        this.table = table
    }

    findAll(params) {
        let table = this.table
        let sql = `select * from ${table} where 1=1`

        let keys = Object.keys(params)

        let array = []
        for (let i = 0; i < params.length; i++) {
            let key = keys[i]
            sql += ` and ${key}=?`
            array.push(params[key])
        }

        let result = connect(sql, array)
        return result
    }

    findBy(params) {
        let table = this.table
        let sql = `select * from ${table} where 1=1`

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
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            if (fieldSql == '') {
                fieldSql = `${key}`
                valueSql = '?'
            } else {
                fieldSql += `, ${key}`
                valueSql += ', ?'
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
        let idKeys = Object.keys(params)
        for (let i = 0; i < idKeys.length; i++) {
            let key = keys[i]
            sql += ` ${key}=?`
            array.push(idParams[key])
        }

        let result = connect(sql, array)
        return result
    }

    delete(id) {
        let sql = `update ${this.table} SET status=3 where id=?`
        let result = connect(sql, id)
        return result
    }

    remove(id) {
        let sql = `delete form ${this.table} where id=?`
        let result = connect(sql, id)
        return result
    }

    execute(sql, params) {
        let result = connect(sql, params)
        return result
    }
}
