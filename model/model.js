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
    let sql = `select * from users where user_id=? and user_pass=?`
    return db.first(sql, param)
}