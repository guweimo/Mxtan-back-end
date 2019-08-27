import db from '../config/db'

export const getListPage = (...params) => {
    let p = {
        pageSize: params.pageSize,
        pageTotal: params.pageTotal
    }
    const sql = 'select * from blog where title=? limit ?,?'
    return db.execute(sql, ...params)
}

export const fetchDetail = (id) => {
    const sql = 'select * from blog where id=?'
    return db.first(sql, id)
}

export const saveData = (...params) => {
    let sql = 'insert into blog (title, content, description, marktext, type_id) values (?, ?, ?, ?, ?)'
    return db.execute(sql, ...params)
}

export const getBlogAllType = () => {
    let sql = 'select * from blog_type'
    return db.all(sql)
}

export const getBlogList = (data) => {
    let sql = 'select * from blog where 1=1'
    let sqlSlice = ''
    let params = []
    if (data.type) {
        sqlSlice = ' and type_id=?'
        params.push(data.type)
    }
    if (data.title) {
        sqlSlice += ' and title like ?'
        let title = `%${data.title}%`
        params.push(title)
    }
    sql += sqlSlice + ' order by create_time desc limit ?,?'
    params.push(data.currentSize, data.limit)
    return db.all(sql, ...params)
}
