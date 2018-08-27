import db from '../config/db'

export const findNavData = () => {
    let sql = 'select * from nav where state=1'
    return db.all(sql)
}

export const findPageList = (type) => {
    let andSql = type === '' ? '' : ' and a.n_id=?'

    let sql = `select a.*, n.title as n_title from article a, nav n 
        where a.n_id=n.n_id and a.state=1 ${andSql}  
        order by \`current_time\` desc`

    return db.all(sql, type)
}

export const loginUser = (...param) => {
    let sql = `select * from users where username=? and pass=?`
    return db.first(sql, ...param)
}

export const insertArticle = (...param) => {
    let sql = 'insert into article (title, description, marktext, n_id) values (?, ?, ?, ?)'
    return db.execute(sql, ...param)
}

export const searchArticle = (title) => {
    let sql = 'select * from article where state=1 and title=? order by `current_time` desc'
    return db.all(sql, title)
}

export const searchDetail = (id) => {
    let sql = 'select * from article where state=1 and id=?'
    return db.first(sql, id)
}

export const searchUser = (...param) => {
    let sql = `select * from users where id=?`
    return db.first(sql, ...param)
}
