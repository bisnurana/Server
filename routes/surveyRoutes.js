const express = require('express');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredit = require('../middlewares/requireCredit');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const router = express.Router();

//handling survey routes
const Survey = require('../models/survey');
router.post('/', requireLogin, requireCredit, function(req, res) {
  const { title, subject, body, recipients } = req.body;
  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients
      .split(',')
      .map(emailAddress => ({ email: emailAddress.trim() })),
    _user: req.user.id,
    dateSent: Date.now()
  });
  //send email to sendgrid
  const mailer = new Mailer(survey, surveyTemplate(survey));
  mailer.send();
  console.log('email sent');
});
module.exports = router;
