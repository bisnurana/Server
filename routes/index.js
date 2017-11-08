const express = require('express');
const router = express.Router();
//handling home routes
router.get('/', function(req, res){
    res.send({Hello:'Index route'});
});
module.exports = router;