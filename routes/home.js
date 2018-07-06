import moment from 'moment'
import express from 'express'
import db from '../config/db'
const router = express.Router();

// const db = require('../config/db');

router.get('/navlist', function (req, res, next) {
    db.query('select * from nav', function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.post('/list', (req, res, next) => {
    db.query('select * from article where state=1 order by `current_time` desc ', (err, result) => {
        if (err) {
            res.send(err);
        } else {
            let data = result;
            for (let arr of data) {
                arr.date = moment(arr.current_time).format('YYYY-MM-DD')
                arr.current_time = moment(arr.current_time).format('YYYY-MM-DD HH:mm:ss')
                arr.update_time = moment(arr.update_time).format('YYYY-MM-DD HH:mm:ss')
            }
            res.send(data);
        }
    })
})

export default router
