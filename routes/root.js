var express = require('express');
var router = express.Router();

router.get('/', function onRootGET(req, res) {
    //if (req.session.userName === undefined) {
    if (req.userName === undefined) {
        res.render('homepage', { home: true, member: false });
    }
    else {
        res.render('homepage', { home: true, member: true });
    }
});

module.exports = router;