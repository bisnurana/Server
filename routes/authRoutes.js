const express = require('express');
const router = express.Router();
const passport = require('passport');
// handle authentication routes
router.get(
  '/',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/surveys');
  }
);

module.exports = router;
