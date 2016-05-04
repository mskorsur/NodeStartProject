var secret = require('./secret');
var jwt = require('jsonwebtoken');
var Cookies = require('cookies');

module.exports = function (req, res, next) {
    /* used with session middlewarw
    if (req.session.userName === undefined)
        res.redirect('/');
    else
        next();
     
     */

    //used with JWTs
    var token = new Cookies(req, res).get('access_token');
    if ((req.originalUrl === '/' || req.originalUrl === '/data' || req.originalUrl === '/login' || req.orignalUrl === '/register') && token === undefined)
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
