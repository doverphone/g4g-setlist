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
	Setlist.find().populate('sets').exec(function(err, setlists) {
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
	Setlist.findById(id).populate('sets.songs').exec(function(err, setlist) {
		if (err) return next(err);
		if (! setlist) return next(new Error('Failed to load Setlist ' + id));
		req.setlist = setlist ;
		next();
	});
};