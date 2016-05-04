var express = require('express');
var router = express.Router();
var Cookies = require('cookies');

//when this route is matched, a session ID is retrieved and a corresponding
//session info is deleted from the database while user is being redirected to the homepage
router.get('/', function onLogout(req, res) {
    /* used with session-based middleware
   req.session.destroy(function onSessionEnd(err) {
        if (err)
            res.render('error', {
            layout: 'main', 
            title: 'Error logging out!', 
            message: 'Something went wrong during your logout. Please try again!'
        });
        else 
            res.redirect('/');
    });
    */
    req.userName = null;
    req.userRole = null;

    deleteCookie = new Cookies(req, res).set('access_token', {
        httpOnly: true
    });

    res.redirect('/');
});

module.exports = router;