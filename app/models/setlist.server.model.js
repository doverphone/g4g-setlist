'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Setlist Schema
 */
var SetlistSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	date: {
		type: Date,
		required: 'Enter a date for the show'
	},
	venue: {
		type: Schema.Types.ObjectId,
		ref: 'Venue',
		required: 'Select a venue for the show'
	},
	sets: [{
		type: Schema.Types.ObjectId,
		ref: 'Set'
	}]
});

mongoose.model('Setlist', SetlistSchema);
