import moment from 'moment'
import express from 'express'
import db from '../config/db'

const router = express.Router()

router.get('/navlist', (req, res, next) => {
    db.query('select * from nav where state=1', (err, result) => {
        if (err) {
            res.send({
                status: 2001,
                message: err.message
            })
        } else {
            res.send({
                status: 2000,
                data: result
            })
        }
    })
})

router.post('/list', (req, res, next) => {
    let type = req.query.type || ''
    
    let andSql = type === '' ? '' : ' and a.n_id=?'
    let sql = `select a.*, n.title as n_title from article a, nav n 
        where a.n_id=n.n_id and a.state=1 ${andSql}  
        order by \`current_time\` desc`

    let sqlParm = [type]

    // 请求数据库，获取数据
    db.query(sql, sqlParm, (err, result) => {
        if (err) {
            res.send({
                status: 2000,
                message: err.message
            })
        } else {
            let data = result
            for (let arr of data) {
                // 处理时间格式
                arr.date = moment(arr.current_time).format('YYYY-MM-DD')
                arr.current_time = moment(arr.current_time).format('YYYY-MM-DD HH:mm:ss')
                arr.update_time = moment(arr.update_time).format('YYYY-MM-DD HH:mm:ss')
            }
            res.send({
                status: 2000,
                data
            })
        }
    })
})

export default router
