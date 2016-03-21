var express = require('express');
var mongoose = require('mongoose');
var user = require('../model/userScheme');
var router = express.Router();


//handling GET request for /login route - check the session state to see if the
//user is already logged in; if so redirect him to the homepage page, if not render
//the login view to him
router.get('/', function onLoginGET(req, res) {
    if (req.session.userName != undefined) {
        res.redirect('/');
    }
    else {
        res.render('login', {
            layout: 'layout', 
            title: 'Login to students application', 
            message: 'Please enter your username and password'
        });
    }
});


//handling POST request for /login route - querying the database to see if the entered user exists - if it does(both
//username and password are valid) the user is redirected to homepage; if not the login view is rendered with an error message
//IMPORTANT!! - always use findOne to get a specific user; in that case findOne will return a single object whose properties can
//be accessed directly like user.password
//if find() is used, an array of objects is returned(in this case with a single element) so the syntax would be user[0].username which
//is verbose and error-prone
router.post('/', function onLoginPOST(req, res) {
    user.findOne({ username: req.body.username }, function (err, user) {
        if (user === null) {
            res.render('login', {
                layout: 'layout', 
                title: 'Login failed', 
                message: 'Invaild username or password, please try again!'
            });
        }
        else {
            if (user.validPassword(req.body.password)) {
                req.session.userName = user.username;
                req.session.userEmail = user.email;
                req.session.userRole = user.role;
                res.redirect('/');
            }
            else {
                res.render('login', {
                    layout: 'layout', 
                    title: 'Login failed', 
                    message: 'Invaild username or password, please try again!'
                });
            }
        }
    });
});

module.exports = router;