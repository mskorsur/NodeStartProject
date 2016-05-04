module.exports = function (req, res, next) {
    req.date = new Date();
    console.log('----------------');
    console.log('A new request on ' + req.date);
    
    //if (req.session.userName !== null) {
    // console.log('User: ' + req.session.userName);
    if (req.userName !== null) {
          console.log('User: ' + req.userName);
    }

    console.log('METHOD: ' + req.method + '  ' + 'URL: ' + req.originalUrl + '  ' + 'IP: ' + req.ip);
    next();
};