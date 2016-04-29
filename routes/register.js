var express = require('express');
var mongoose = require('mongoose');
var user = require('../model/userScheme');

var router = express.Router();

//handling GET request to the /register path - just displaying the
//form which needs to be filled so that the app can save a user
/*
router.get('/', function onRegisterGET(req, res) {
    res.render('registration', 
     {
        layout: 'layout', 
        title: 'Node Student Program Registration',
        message: 'Please fill out the following form.'
    });
});
*/
//Registration form has been moved to the homepage view as a modal - no longer necessary to answer GET request for /register

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
                    req.session.userName = newUser.username;
                    req.session.userEmail = newUser.email;
                    req.session.userRole = newUser.role;
                    res.redirect('/');
                }
            });
        }
        else {
            res.render('registration', {
                layout: 'layout',
                title: 'Registration Error',
                message: 'Selected username already exists! Please choose another one.'
            });
        }
    });

});


module.exports = router;