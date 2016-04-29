var express = require('express');
var router = express.Router();
var student = require('../model/dataScheme');

//be careful when setting up paths  - the one that was sent from app.js
// which is /data corresponds with / in this module!!!

//query the database for all students, log the error if there was any
//otherwise data will be sent to the template which will be rendered for the user
router.get('/', function onDataGET(req, res) {

    //variable need to determine whether a user is only a guest
    //in which case no other options besides getting data are displayed or is he 
    //logged in and in that turn all availabe options are displayed to him
    var memberStatus = null;
    if (req.session.userName != undefined)
        memberStatus = true;
    else
        memberStatus = false;

    student.find({}, function (err, data) {
        if (err)
            res.render('get', {
            layout: 'homepage', 
            home: false,
            member: memberStatus, 
            message: 'Couldn\'t get information \nfrom the database'
        });
        else
            res.render('get', {
            layout: 'homepage', 
            home: false, 
            member: memberStatus,
            message: 'Displaying information about the students:', 
            students: data
        });
    });

});


router.get('/:programs', function dataGETwithParams(req, res) {
    var programs = req.params.programs;
    
    var memberStatus = null;
    if (req.session.userName != undefined)
        memberStatus = true;
    else
        memberStatus = false;

    student.find({ program : programs }, function (err, data) {
        if (err)
            res.render('get', {
            layout: 'homepage', 
            home: false, 
            member: memberStatus,
            message: 'Couldn\'t get information \nfrom the database'
        });
        else
            res.render('get', {
            layout: 'homepage', 
            home: false, 
            member: memberStatus,
            message: 'Displaying information about the students:', 
            students: data
        });
     });
   
});

module.exports = router;