'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Setlist = mongoose.model('Setlist'),
	_ = require('lodash');

/**
 * Create a Setlist
 */
exports.create = function(req, res) {
	var setlist = new Setlist(req.body);
	setlist.user = req.user;

	setlist.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(setlist);
		}
	});
};

/**
 * Show the current Setlist
 */
exports.read = function(req, res) {
	res.jsonp(req.setlist);
};

/**
 * Update a Setlist
 */
exports.update = function(req, res) {
	var setlist = req.setlist ;

	setlist = _.extend(setlist , req.body);

	setlist.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(setlist);
		}
	});
};

/**
 * Delete an Setlist
 */
exports.delete = function(req, res) {
	var setlist = req.setlist ;

	setlist.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(setlist);
		}
	});
};

/**
 * List of Setlists
 */
exports.list = function(req, res) { 
	Setlist.find().sort('-created').populate('user', 'displayName').exec(function(err, setlists) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(setlists);
		}
	});
};

/**
 * Setlist middleware
 */
exports.setlistByID = function(req, res, next, id) { 
	Setlist.findById(id).populate('user', 'displayName').exec(function(err, setlist) {
		if (err) return next(err);
		if (! setlist) return next(new Error('Failed to load Setlist ' + id));
		req.setlist = setlist ;
		next();
	});
};

/**
 * Setlist authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.setlist.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
