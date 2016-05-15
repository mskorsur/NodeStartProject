var secret = require('./secret');
var jwt = require('jsonwebtoken');
var Cookies = require('cookies');

module.exports = function (req, res, next) {
    /* used with session middleware
    if (req.session.userName === undefined)
        res.redirect('/');
    else
        next();
     
     */

    //used with JWTs
    //get a cookie containing the value of an access token
    var token = new Cookies(req, res).get('access_token');

    //allow a user to visit non-restricted paths even without a token, those paths are open for every guest
    //token == "[object Object]" condition is necessary for a user who has just logged out so that he could browse the app as a guest
    //cookie middleware leaves cookie in that state after deleting it
    if ((req.originalUrl === '/' || req.originalUrl === '/data' || req.originalUrl === '/login' || req.originalUrl === '/register') 
        && (token === undefined || token == "[object Object]")) 
        next();
    else {
        var verifiedToken = jwt.verify(token, secret, function (err, decodedToken) {
            if (err) 
                res.redirect('/');
            else {
                req.userName = decodedToken.user;
                req.userRole = decodedToken.role;
                next();
            }
        });
    }
};
