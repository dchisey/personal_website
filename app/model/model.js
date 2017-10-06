var express = require('express'),
	mongoose = require('mongoose'),
	app = express(),
	Schema = mongoose.Schema;

var	ContactSchema = new Schema({
	firstName: {
		type: String,
		required: 'Please enter your first name.'
	},
	lastName: {
		type: String,
		required: 'Please enter your last name.'
	},
	date: {
		type: Date,
		default: Date.now
	},
	message: {
		type: String,
		required: "You forgot to tell me what you needed!"
	}
})

module.exports = mongoose.model('Contacts', ContactSchema);