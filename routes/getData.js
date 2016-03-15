var express = require('express');
var router = express.Router();
var student = require('./dataScheme');

//be careful when setting up paths  - the one that was sent from app.js
// which is /data corresponds with / in this module!!!

//query the database for all students, log the error if there was any
//otherwise data will be sent to the template which will be rendered for the user
router.get('/', function (req, res) {
    student.find({}, function (err, data) {
        if (err) res.render('get', { layout: 'main', title: 'Student information', message: 'Couldn\'t get information \nfrom the databse' });
        else res.render('get', { layout: 'main',title: 'Student information', message: 'Displaying information about the students:', students: data });
    });

});


router.get('/:programs', function (req, res) {
    var programs = req.params.programs;
   
    student.find({ program : programs }, function (err, data) {
        if (err) res.render('get', { layout: 'main', title: 'Student information', message: 'Couldn\'t get information \nfrom the databse' });
        else res.render('get', { layout: 'main',title: 'Student information', message: 'Displaying information about the students:', students: data });
     });
   
});

module.exports = router;