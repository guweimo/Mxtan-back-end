import db from '../config/db'

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
