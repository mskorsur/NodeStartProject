var express = require('express');
var router = express.Router();
var user = require('../model/userScheme');

//handling GET request to the /profile path
//a user must be logged in to access this path
//Firstly, the database is queried to find the user based on his username in the session info,
//if he is found, a view is rendered containing account data from the database and a form to update password
//on the other hand, if he cannot be found due to a database error, a view is rendered with an appropriate message
router.get('/', function onProfileGET(req, res) {
    // user.findOne({ username: req.session.userName }, function foundUserInfo(err, userInfo) {
    user.findOne({ username: req.userName }, function foundUserInfo(err, userInfo) {
        if (err) {
            res.render('profile', {
                layout: 'homepage',
                home: false,
                message: 'Error retrieving information! Please try again.',
                status: 'Set up a new password: '
            });
        }
        else {
            res.render('profile', {
                layout: 'homepage',
                home: false,
                member: true,
                message: 'Displaying profile information',
                status: 'Set up a new password',
                user: userInfo
            });
        }
    });
});

//handlind POST request to the /profile path in order to enable a user to change his current password
//The database is queried to find the logged user based on the username in the session information.
//In the case of a database error, a view is rendered with an appropriate status message;
//if the user is found, entry for the current password from the request body is checked to determine if it matches
//the one currently stored in the database
//If the two match, entries for a new password are checked to see if the user entered desired new password correctly 
//two times to ensure he specifically meant that password
//After all checkups have been done, the new password entry is hashed and the user's database information updated with it.
//Otherwise, for all failed attempts, a view is rendered with an appropriate warning.
router.post('/', function onProfilePOST(req, res) {
    //user.findOne({ username: req.session.userName }, function setNewPassword(err, userInfo) {
    user.findOne({ username: req.userName }, function setNewPassword(err, userInfo) {
        if (err) {
            res.render('profile', {
                layout: 'homepage',
                home: false,
                message: 'Error retrieving information! Please try again.',
                status: 'Set up a new password: '
            });
        }
        else {
            if (userInfo.validPassword(req.body.currentPassword) && (req.body.newPassword === req.body.retypedPassword)) {
                //hash user's new password and update his entry in the database
                var newPasswordHash = userInfo.generateHash(req.body.newPassword);
                //user.update({ username: req.session.userName }, { $set: { password: newPasswordHash } }, function onSuccessfulSet() {
                user.update({ username: req.userName }, { $set: { password: newPasswordHash } }, function onSuccessfulSet() {
                    //render a view with a positive message
                    res.render('profile', {
                        layout: 'homepage',
                        home: false,
                        memeber: true,
                        message: 'Displaying profile information',
                        status: 'Password changed successfully!',
                        user: userInfo
                    });
                });
            }
            else {
                res.render('profile', {
                    layout: 'homepage',
                    home: false,
                    member: true,
                    message: 'Displaying profile information',
                    status: 'Passwords do not match!',
                    user: userInfo
                });
            }
        }
    });
});

module.exports = router;