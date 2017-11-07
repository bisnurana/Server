const express = require('express');
const app = express();

app.get('/', function(req,res){
    res.send({hello:'world!'});
});

const PORT = process.env.port  || 3000;
app.listen(port);