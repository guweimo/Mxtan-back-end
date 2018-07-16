import express from 'express'
import db from '../config/db'

const router = express.Router()

router.post('/loginUser', (req, res, next) => {
    let sql = `select * from users where user_id=?`
    let sqlParam = [req.body.name]
    db.query(sql, sqlParam, (err, result) => {
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

export default router
