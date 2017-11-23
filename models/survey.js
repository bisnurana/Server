const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const recipientSchema = require('./recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [recipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponse: Date
});
module.exports = mongoose.model('surveys', surveySchema);
