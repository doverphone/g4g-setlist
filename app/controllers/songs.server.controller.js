'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Song = mongoose.model('Song'),
	_ = require('lodash'),
	fs = require('fs'),
	id3 = require('id3js');

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
	Song.find().sort('-created').populate('displayName').exec(function(err, songs) {
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
	Song.findById(id).populate('displayName').exec(function(err, song) {
		if (err) return next(err);
		if (! song) return next(new Error('Failed to load Song ' + id));
		req.song = song ;
		next();
	});
};

exports.upload = function(req, res, next) {
	// TODO - use config var for path
	var newPath = '/Users/bendoherty/Sites/meanlist/public/uploads/' + req.files.mp3.name;
	fs.readFile(req.files.mp3.path, function (err, data) {
		fs.writeFile(newPath, data, function (err) {
			next();
		});
	});
};

exports.readMp3 = function(req, res, next) {
	// TODO - use config var for path
	id3({ file: '/Users/bendoherty/Sites/meanlist/public/uploads/' + req.files.mp3.name, type: id3.OPEN_LOCAL }, function(err, tags) {
	    if (tags.v2) {
	    	var song = new Song({
	    		name: tags.v2.title,
	    		artist: tags.v2.artist,
	    	});

	    	song.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.redirect('/#!/songs/' + song._id);
				}
			});
	    }
	});
};
