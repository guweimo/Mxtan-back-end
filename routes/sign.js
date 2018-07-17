import express from 'express'
import db from '../config/db'
import User from '../controller/main/user'

const router = express.Router()

router.post('/loginUser', User.login)

router.post('/loginUser', (req, res, next) => {
    let sql = `select * from users where user_id=? and user_pass=?`
    let sqlParam = [req.body.name, req.body.pass]
    db.query(sql, sqlParam, (err, result) => {
        if (err) {
            res.send({
                status: 2005,
                message: err.message
            })
        } else {
            if (result.length == 0) {
                res.send({
                    status: 2001,
                    message: '用户名或密码错误！'
                })
            } else {
                res.send({
                    status: 2000,
                    data: result[0]
                })
            }
        }
    })
})

export default router
