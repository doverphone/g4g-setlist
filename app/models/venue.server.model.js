'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Venue Schema
 */
var VenueSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Venue name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	address: {
		type: String,
		default: ''
	},
	phone: {
		type: String,
		default: ''
	},
	info: {
		type: String,
		default: ''
	}
});

mongoose.model('Venue', VenueSchema);