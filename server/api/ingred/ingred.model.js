'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IngredSchema = new Schema({
	name          	: { type: String, required: true, trim: true },
	notes          	: { type: String, required: false, trim: true },
	category      	: { type: String, required: true, trim: true, lowercase: true },
	imageUrl      	: { type: String, trim: true },
	imageId      	: { type: String, trim: true },
	inStock			: { type: Boolean, default: false },
	active: 		Boolean
});

module.exports = mongoose.model('Ingred', IngredSchema);