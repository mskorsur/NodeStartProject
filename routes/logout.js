var express = require('express');
var router = express.Router();

//when this route is matched, a session ID is retrieved and a corresponding
//session info is deleted from the database while user is being redirected to the homepage
router.get('/', function onLogout(req, res) {
   req.session.destroy(function onSessionEnd(error) {
        if (error) res.render('error', {
            layout: 'main', 
            title: 'Error logging out!', 
            message: 'Something went wrong during your logout. Please try again!'
        });
        else {
            res.redirect('/');
        }
            
    });
});

module.exports = router;