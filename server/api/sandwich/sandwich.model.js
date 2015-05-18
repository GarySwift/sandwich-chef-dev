'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SandwichSchema = new Schema({
	name          	: { type: String, required: true, trim: true },
	notes          	: { type: String, required: false, trim: true },
	category      	: { type: String, required: true, trim: true, lowercase: true },
	// subCategory     : { type: String, trim: true, lowercase: true },
	imageUrl      	: { type: String, trim: true },
	imageId      	: { type: String, trim: true },
	price         	: { type: Number, get: getPrice, set: setPrice, default: 0 },
	// info			: String,
	// history			: [{ 
	// 					userId: String,//ObjectId, 
	// 					comment: String, 
	// 					date: Date 
	// 				  }],//Array
	bread: { type: String, trim: true },
	filling: [{ type: String, trim: true }],
	salad: [{ type: String, trim: true }],
	extra: [{ type: String, trim: true }],
	inStock			: { type: Boolean, default: false },
	active: 		Boolean
});

// Enable Mongoose getter functions
SandwichSchema.set('toObject', { getters: true });
SandwichSchema.set('toJSON', { getters: true });

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

module.exports = mongoose.model('Sandwich', SandwichSchema);