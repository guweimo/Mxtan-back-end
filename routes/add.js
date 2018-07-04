var express = require('express');
const router = express.Router();

const db = require('../config/config');

router.get('/navlist', function (req, res, next) {
    db.query('select * from nav', function (err, result) {
        
        if (err) {
            res.send(err);
        } else {
            
            res.send(result);
        }
    });
});

export default router
