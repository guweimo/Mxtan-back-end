import express from 'express'
import db from '../config/db'

const router = express.Router()

router.post('/loginUser', (req, res, next) => {
    db.query('', (err, result) => {
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
