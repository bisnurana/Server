const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const recipientSchema = new Schema({
  email: String,
  response: { type: Boolean, default: false }
});
module.exports = recipientSchema;
