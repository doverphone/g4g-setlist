'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Venue = mongoose.model('Venue'),
	Setlist = mongoose.model('Setlist');

/**
 * Globals
 */
var user, venue, showDate, setlist;

/**
 * Unit tests
 */
describe('Setlist Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		venue = new Venue({
			name: 'The Doghouse'
		});

		showDate = new Date('2015-12-02');

		user.save(function() { 
			setlist = new Setlist({
				venue: venue,
				date: showDate
			});
			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return setlist.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			setlist.venue = undefined;

			return setlist.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without a show date', function(done) { 
			setlist.date = undefined;

			return setlist.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Setlist.remove().exec();
		User.remove().exec();

		done();
	});
});