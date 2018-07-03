var express = require('express');
var router = express.Router();

var db = require('../config/config');

router.get('/', function (req, res, next) {
    db.query('select * from nav', function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = router;
