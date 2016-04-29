var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var student = require('../model/dataScheme');

router.get('/', function onSendGET(req, res) {
    res.render('send', {
        layout: 'homepage', 
        home: false, 
        member: true,
        message: 'Fill the form and send it to the database'
    });
});

router.post('/', function onSendPOST(req, res) {
    new student({
        _id : new mongoose.Types.ObjectId,
        studentNumber : req.body.studentNumber,
        name : req.body.name,
        program: req.body.program,
        courses : req.body.courses
    }).save(function (err) {
        if (err)
            res.render('send', {
                layout: 'homepage',
                home: false,
                member: true,
                message: 'An error has occurred while saving student!'
            });
        else
            res.render('send', {
                layout: 'homepage',
                home: false,
                member: true,
                message: 'Student has been successfully saved!'
            });
    });
});

module.exports = router;