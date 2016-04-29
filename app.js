var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var hbs = require('hbs');

//session-based packages
var session = require('express-session');
var MongoStore = require('connect-mongo')(session); //uses MongoDB to store session data

//application start-up
var app = express();

//defining different route handlers
var root = require('./routes/root');
var sendData = require('./routes/sendData');
var getData = require('./routes/getData');
var profile = require('./routes/profile');
var register = require('./routes/register');
var login = require('./routes/login');
var logout = require('./routes/logout');

//middleware for logging new requests info and verifying that a user is logged in
var checkLogin = require('./libs/requireLogin');
var logReqInfo = require('./libs/logRequestInfo');

//establishing database connection
mongoose.connect('mongodb://localhost:27017/learn', function (err) {
    if (err) console.log('Can \'t establish connection with the database');
    else console.log('Successfully connected to MongoDB');
});

//setting up a default view engine and folder 
//which contains different views
app.set('views', './views');
app.set('view engine', 'hbs');

//parsing data from all requests into JSON format
app.use(bodyParser.json());
//URL encoding needed for form data
app.use(bodyParser.urlencoded({ extended: false }));

//creating a new session
app.use(session({
    secret: 'one super secret string',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ url: 'mongodb://localhost:27017/learn' })
}));


app.use(logReqInfo);

//mounting handler to the root path in order to
//respond with the homepage
app.use('/', root);

//mouting handler to the /register path in order for a user
//to be able to register
app.use('/register', register);

//mounting handler to the /login path in order for a user
//to be able to login
app.use('/login', login);

//mounting handler to the /logout path in order for a user
//to be able to logout
app.use('/logout', logout);

//mouting handler to the /data path in order to
//send back data from the database to a user
app.use('/data', getData);

//mouting handler to the /send path in order to
//get data from a user which is located in the request body
app.use('/send', checkLogin, sendData);

//mouting handler to the /profile path in order to
//send user's account data to the user for review
app.use('/profile', checkLogin, profile);

//defining default 404 response
app.use(function (req, res) {
    res.status(404).send('Error 404 didn\'t find that!');
});

//default 500 response
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(8081, function (err) {
    if (err) console.log('Error starting the server');
    else console.log('Server has started on port 8081');
});