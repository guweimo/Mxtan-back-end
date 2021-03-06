import db from '../config/db'

export const saveZhihuList = (...params) => {
    let p = {
        author: params.author,
        title: params.title,
        content: params.content,
        excerpt: params.excerpt,
        create_time: params.create_time,
        updated_time: params.updated_time,
    }
    const sql = `insert into zhihu (author, title, content, excerpt, create_time, updated_time) values (?, ?, ?, ?, ?, ?)`
    return db.execute(sql, ...params)
}

export const getListPage = (...params) => {
    let p = {
        pageSize: params.pageSize,
        pageTotal: params.pageTotal
    }
    const sql = 'select * from zhihu limit ?,?'
    return db.execute(sql, ...params)
}

export const fetchDetail = (id) => {
    const sql = 'select * from zhihu where id=?'
    return db.execute(sql, id)
}
