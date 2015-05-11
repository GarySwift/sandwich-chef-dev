'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IngredSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Ingred', IngredSchema);