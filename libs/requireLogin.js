﻿module.exports = function (req, res, next) {
    if (req.session.userName === undefined)
        res.redirect('/login');
    else
        next();
};
