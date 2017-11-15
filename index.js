const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/user');
//models must be imported before passport because passport need access to models when server loads
require('./models/user');
require('./services/passport');
//connect to mongo database
mongoose.connect(keys.mongoURI);
const app = express();

//setting cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

// initializing passport to use cookies
app.use(passport.initialize());
app.use(passport.session());

//handle routes
app.use('/auth/google', authRoutes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, function() {
  console.log('Server running at port ' + PORT);
});
