'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Song = mongoose.model('Song'),
	_ = require('lodash');

/**
 * Create a Song
 */
exports.create = function(req, res) {
	var song = new Song(req.body);
	song.user = req.user;

	song.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(song);
		}
	});
};

/**
 * Show the current Song
 */
exports.read = function(req, res) {
	res.jsonp(req.song);
};

/**
 * Update a Song
 */
exports.update = function(req, res) {
	var song = req.song ;

	song = _.extend(song , req.body);

	song.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(song);
		}
	});
};

/**
 * Delete an Song
 */
exports.delete = function(req, res) {
	var song = req.song ;

	song.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(song);
		}
	});
};

/**
 * List of Songs
 */
exports.list = function(req, res) { 
	Song.find().sort('-created').populate('user', 'displayName').exec(function(err, songs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(songs);
		}
	});
};

/**
 * Song middleware
 */
exports.songByID = function(req, res, next, id) { 
	Song.findById(id).populate('user', 'displayName').exec(function(err, song) {
		if (err) return next(err);
		if (! song) return next(new Error('Failed to load Song ' + id));
		req.song = song ;
		next();
	});
};

/**
 * Song authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.song.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
