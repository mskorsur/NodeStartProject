var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

//defining different route handlers
var root = require('./routes/root');
var sendData = require('./routes/sendData');
var getData = require('./routes/getData');

//establishing database connection
mongoose.connect('mongodb://localhost:27017/learn', function (err) {
    if (err) console.log('Can \'t establish connection with the database');
    else console.log('Successfully connected to MongoDB');
});

//parsing data from all requests into JSON format
app.use(bodyParser.json());
//URL encoding needed for form data
app.use(bodyParser.urlencoded({ extended: false }));


//setting up a default view engine and folder 
//which contains different views
app.set('views', './views');
app.set('view engine', 'jade');

//request info middleware
var logRequestInfo = function (req, res, next) {
    req.date = new Date();
    console.log('----------------');
    console.log('A new request on ' + req.date);
    console.log('METHOD: ' + req.method + '  ' + 'URL: ' + req.originalUrl + '  ' + 'IP: ' + req.ip);
    next();
};

app.use(logRequestInfo);

//mounting handler to the root path in order to
//respond with the homepage
app.use('/', root);

//mouting handler to the /data path in order to
//send back data from the database to the user
app.use('/data', sendData);

//mouting handler to the /send path in order to
//get data from the user which is located in the request body
app.use('/send', getData);

//defining default 404 response
app.use(function (req, res) {
    res.status(404).send('Error 404 didn\'t find that!');
});

app.listen(8181, function (err) {
    if (err) console.log('Error starting the server');
    else console.log('Server has started on port 8181');
});