const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user =>{
        done(null, user);
    });
});

// passport authentication
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    // to fix redirect error
    proxy: true
}, 
async function(accessToken, refreshToken, profile, done){
    //async queries request that yield promise
    const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            //already a user
            return done(null, existingUser);
        }
        //create a new user
        const user = await new User({ googleId: profile.id}).save();
        done(null, user);
        
    }
 )
);