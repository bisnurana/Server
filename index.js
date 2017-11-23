const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/user');
const surveyRoutes = require('./routes/surveyRoutes');
//models must be imported before passport because passport need access to models when server loads
require('./models/user');
require('./models/survey');
require('./services/passport');
//connect to mongo database
mongoose.connect(keys.mongoURI);
const app = express();
// use body parser middleware
app.use(bodyParser.json());

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
app.use('/api/surveys', surveyRoutes);
//handle routes in production
if (process.env.NODE_ENV === 'production') {
  //serve assets
  app.use(express.static('client/build'));
  //serve index.html if path unrecognized
  const path = require('path');
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, function() {
  console.log('Server running at port ' + PORT);
});
