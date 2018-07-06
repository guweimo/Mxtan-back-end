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
    });
});

router.post('/list', (req, res, next) => {
    let sql = 'select * from article where state=1 order by `current_time` desc'
    db.query(sql, (err, result) => {
        if (err) {
            res.send({
                status: 2000,
                message: err.message
            })
        } else {
            let data = result
            for (let arr of data) {
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
