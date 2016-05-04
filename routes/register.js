var express = require('express');
var mongoose = require('mongoose');
var user = require('../model/userScheme');

var router = express.Router();

//handling GET request to the /register path - just displaying the
//form which needs to be filled so that the app can save a user

router.get('/', function onRegisterGET(req, res) {
    res.render('register', 
     {
        layout: 'homepage', 
        message: 'Please fill out the following form.',
        member: false
    });
});


//handling POST request for to the /register path - firstly, the database is 
//queried to see if the selected username already exists; if it does, the registration form
//is displayed again with an appropriate error message. If there is no such user with that username,
//a new entry is stored in the database with the data from the request body(the form which was filled out by a user)
//passwords are stored using sha256 hashing algorithm
router.post('/', function onRegisterPOST(req, res) {
    user.findOne({ username: req.body.username }, function (err, existing) {
        if (existing === null) {
            var newUser = new user({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                email: req.body.email,
                role: 'member',
                date: new Date()
            });
            newUser.password = newUser.generateHash(req.body.password);

            newUser.save(function (err) {
                if (err) res.send('<h3>An error has occured during registration</h3>');
                else {
                    /*
                    req.session.userName = newUser.username;
                    req.session.userEmail = newUser.email;
                    req.session.userRole = newUser.role;
                    */

                    var token = jwt.sign({ user: newUser.username, role: 'member' }, secret, {
                        issuer: 'node-student-app',
                        expiresIn: '24h'
                    });
                    
                    setCookie = new Cookies(req, res).set('access_token', token, {
                        httpOnly: true
                    });

                    res.redirect('/');
                }
            });
        }
        else {
            res.render('register', {
                layout: 'homepage',
                message: 'Selected username already exists! Please choose another one.',
                memeber: false
            });
        }
    });

});


module.exports = router;