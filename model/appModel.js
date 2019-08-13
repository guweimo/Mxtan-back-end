import db from '../config/db'

export const getListPage = (...params) => {
    let p = {
        pageSize: params.pageSize,
        pageTotal: params.pageTotal
    }
    const sql = 'select * from blog limit ?,?'
    return db.execute(sql, ...params)
}

export const fetchDetail = (id) => {
    const sql = 'select * from blog where id=?'
    return db.execute(sql, id)
}

export const saveData = (...params) => {
    const sql = ''
    return db.execute(sql, ...params)
}
