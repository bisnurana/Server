const express = require('express');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredit = require('../middlewares/requireCredit');

const router = express.Router();

// logging out user
router.get('/logout', function(req, res) {
  req.logOut();
  res.redirect('/');
});

//handling api routes
router.get('/current_user', function(req, res) {
  res.send(req.user);
});

//handling api routes
router.post('/stripe', requireLogin, async function(req, res) {
  const charge = await stripe.charges.create({
    amount: 500,
    currency: 'usd',
    source: req.body.id,
    description: 'Charge for survey'
  });
  req.user.credits += 5;
  const user = await req.user.save();
  res.send(user);
});
module.exports = router;
