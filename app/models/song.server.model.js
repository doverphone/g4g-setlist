'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Song Schema
 */
var SongSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Song name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	artist: {
		type: String,
		trim: true,
		default: ''
	},
	archived: {
		type: Boolean,
		default: false
	},
	url: {
		type: String,
		trim: true,
		default: ''
	},
	thumbnail: {
		type: String,
		default: ''
	},
	lyrics: {
		type: String,
		default: ''
	},
	groupNotes: {
		type: String,
		trim: true,
		default: ''
	}
});

mongoose.model('Song', SongSchema);