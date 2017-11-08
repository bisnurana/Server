const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/authRoutes');
require('./services/passport');

//connect to mongo database
mongoose.connect(keys.mongoURI);
const app = express();
//handle routes
app.use('/', indexRoutes);
app.use('/auth/google', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log("Server running at port " + PORT);
});