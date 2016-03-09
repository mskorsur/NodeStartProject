var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('homepage', { title: 'Welcome', message: 'Example program using Express, Mongo and Jade'});
});

module.exports = router;