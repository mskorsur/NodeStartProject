var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('homepage', { layout: 'main', title: 'Welcome', message: 'Example program using Express, Mongo and Handlebars'});
});

module.exports = router;