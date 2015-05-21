'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Setlist Schema
 */
var SetSchema = new Schema({
	songs: [{
		type: Schema.ObjectId,
		ref: 'Song'
	}]
});

mongoose.model('Set', SetSchema);