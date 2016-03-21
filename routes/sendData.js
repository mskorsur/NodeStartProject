var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var student = require('../model/dataScheme');

router.get('/', function (req, res) {
    res.render('send', {
        layout: 'homepage', 
        home: false, 
        message: 'Fill the form and send it to the database'
    });
});

router.post('/', function (req, res) {
    new student({
        _id : new mongoose.Types.ObjectId,
        studentNumber : req.body.studentNumber,
        name : req.body.name,
        program: req.body.program,
        courses : req.body.courses
    }).save(function (err) {
        if (err) res.send('<h3>An error has occured while saving student</h3>');
        else res.send('<h3>Student saved successfully</h3>');
    });
});

module.exports = router;