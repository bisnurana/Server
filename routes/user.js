const express = require('express');
const router = express.Router();

// logging out user
router.get('/logout', function(req, res){
    req.logOut();
    res.send(req.user);
});

//handling api routes
router.get('/current_user', function(req, res){
    res.send(req.user);
});
module.exports = router;