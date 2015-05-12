'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
	name          	: { type: String, required: true, trim: true },
	notes          	: { type: String, required: false, trim: true },
	category      	: { type: String, required: true, trim: true, lowercase: true },
	subCategory     : { type: String, trim: true, lowercase: true },
	imageUrl      	: { type: String, trim: true },
	imageId      	: { type: String, trim: true },
	price         	: { type: Number, get: getPrice, set: setPrice, default: 0 },
	inStock			: { type: Boolean, default: false },
	active: 		Boolean
});

// Enable Mongoose getter functions
ProductSchema.set('toObject', { getters: true });
ProductSchema.set('toJSON', { getters: true });

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}


module.exports = mongoose.model('Product', ProductSchema);