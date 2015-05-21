'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var venues = require('../../app/controllers/venues.server.controller');

	// Venues Routes
	app.route('/venues')
		.get(venues.list)
		.post(users.requiresLogin, venues.create);

	app.route('/venues/:venueId')
		.get(venues.read)
		.put(users.requiresLogin, venues.hasAuthorization, venues.update)
		.delete(users.requiresLogin, venues.hasAuthorization, venues.delete);

	// Finish by binding the Venue middleware
	app.param('venueId', venues.venueByID);
};
