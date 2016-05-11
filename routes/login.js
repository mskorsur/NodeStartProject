var express = require('express');
var user = require('../model/userScheme');
var router = express.Router();
var secret = require('../libs/secret');

//needed for JWTs
var Cookies = require('cookies');
var jwt = require('jsonwebtoken');

//handling GET request for /login route - check the session state to see if the
//user is already logged in; if so redirect him to the homepage page, if not render
//the login view to him

router.get('/', function onLoginGET(req, res) {
    //if (req.session.userName != undefined) 
    if (req.userName != undefined) 
        res.redirect('/');
    else 
        res.render('login', {
            layout: 'homepage', 
            message: 'Please enter your username and password',
            member: false
        });
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
                layout: 'homepage', 
                message: 'Invaild username or password, please try again!',
                member: false

            });
        }
        else {
            if (user.validPassword(req.body.password)) {
                /*
                req.session.userName = user.username;
                req.session.userEmail = user.email;
                req.session.userRole = user.role;
                res.redirect('/');
                */
                var token = jwt.sign({ user: user.username, role: 'member' }, secret, {
                    issuer: 'node-student-app',
                    expiresIn: '24h'
                });

                console.log('JWT for' + ' ' + user.username + ' ' + token);
                setCookie = new Cookies(req, res).set('access_token', token, {
                 httpOnly: true
                });

                res.redirect('/');

            }
            else {
                res.render('login', {
                    layout: 'homepage', 
                    message: 'Invaild username or password, please try again!',
                    member: false
                });
            }
        }
    });
});

module.exports = router;