'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Venue = mongoose.model('Venue'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, venue;

/**
 * Venue routes tests
 */
describe('Venue CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Venue
		user.save(function() {
			venue = {
				name: 'Venue Name'
			};

			done();
		});
	});

	it('should be able to save Venue instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Venue
				agent.post('/venues')
					.send(venue)
					.expect(200)
					.end(function(venueSaveErr, venueSaveRes) {
						// Handle Venue save error
						if (venueSaveErr) done(venueSaveErr);

						// Get a list of Venues
						agent.get('/venues')
							.end(function(venuesGetErr, venuesGetRes) {
								// Handle Venue save error
								if (venuesGetErr) done(venuesGetErr);

								// Get Venues list
								var venues = venuesGetRes.body;

								// Set assertions
								(venues[0].name).should.match('Venue Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Venue instance if not logged in', function(done) {
		agent.post('/venues')
			.send(venue)
			.expect(401)
			.end(function(venueSaveErr, venueSaveRes) {
				// Call the assertion callback
				done(venueSaveErr);
			});
	});

	it('should not be able to save Venue instance if no name is provided', function(done) {
		// Invalidate name field
		venue.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Venue
				agent.post('/venues')
					.send(venue)
					.expect(400)
					.end(function(venueSaveErr, venueSaveRes) {
						// Set message assertion
						(venueSaveRes.body.message).should.match('Please fill Venue name');
						
						// Handle Venue save error
						done(venueSaveErr);
					});
			});
	});

	it('should be able to update Venue instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Venue
				agent.post('/venues')
					.send(venue)
					.expect(200)
					.end(function(venueSaveErr, venueSaveRes) {
						// Handle Venue save error
						if (venueSaveErr) done(venueSaveErr);

						// Update Venue name
						venue.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Venue
						agent.put('/venues/' + venueSaveRes.body._id)
							.send(venue)
							.expect(200)
							.end(function(venueUpdateErr, venueUpdateRes) {
								// Handle Venue update error
								if (venueUpdateErr) done(venueUpdateErr);

								// Set assertions
								(venueUpdateRes.body._id).should.equal(venueSaveRes.body._id);
								(venueUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Venues if not signed in', function(done) {
		// Create new Venue model instance
		var venueObj = new Venue(venue);

		// Save the Venue
		venueObj.save(function() {
			// Request Venues
			request(app).get('/venues')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Venue if not signed in', function(done) {
		// Create new Venue model instance
		var venueObj = new Venue(venue);

		// Save the Venue
		venueObj.save(function() {
			request(app).get('/venues/' + venueObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', venue.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Venue instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Venue
				agent.post('/venues')
					.send(venue)
					.expect(200)
					.end(function(venueSaveErr, venueSaveRes) {
						// Handle Venue save error
						if (venueSaveErr) done(venueSaveErr);

						// Delete existing Venue
						agent.delete('/venues/' + venueSaveRes.body._id)
							.send(venue)
							.expect(200)
							.end(function(venueDeleteErr, venueDeleteRes) {
								// Handle Venue error error
								if (venueDeleteErr) done(venueDeleteErr);

								// Set assertions
								(venueDeleteRes.body._id).should.equal(venueSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Venue instance if not signed in', function(done) {
		// Set Venue user 
		venue.user = user;

		// Create new Venue model instance
		var venueObj = new Venue(venue);

		// Save the Venue
		venueObj.save(function() {
			// Try deleting Venue
			request(app).delete('/venues/' + venueObj._id)
			.expect(401)
			.end(function(venueDeleteErr, venueDeleteRes) {
				// Set message assertion
				(venueDeleteRes.body.message).should.match('User is not logged in');

				// Handle Venue error error
				done(venueDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Venue.remove().exec();
		done();
	});
});