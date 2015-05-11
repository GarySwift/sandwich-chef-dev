'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SandwichSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Sandwich', SandwichSchema);