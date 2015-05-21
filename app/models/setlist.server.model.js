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
	name: {
		type: String,
		default: '',
		required: 'Please fill Setlist name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Setlist', SetlistSchema);