var express = require('express');
var router = express.Router();

router.get('/', function onRootGET(req, res) {
    if (req.session.userName === undefined) {
        res.render('main', { layout: 'layout' });
    }
    else {
        res.render('homepage', { home: true });
    }
});

module.exports = router;