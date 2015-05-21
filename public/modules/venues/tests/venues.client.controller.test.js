'use strict';

(function() {
	// Venues Controller Spec
	describe('Venues Controller Tests', function() {
		// Initialize global variables
		var VenuesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Venues controller.
			VenuesController = $controller('VenuesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Venue object fetched from XHR', inject(function(Venues) {
			// Create sample Venue using the Venues service
			var sampleVenue = new Venues({
				name: 'New Venue'
			});

			// Create a sample Venues array that includes the new Venue
			var sampleVenues = [sampleVenue];

			// Set GET response
			$httpBackend.expectGET('venues').respond(sampleVenues);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.venues).toEqualData(sampleVenues);
		}));

		it('$scope.findOne() should create an array with one Venue object fetched from XHR using a venueId URL parameter', inject(function(Venues) {
			// Define a sample Venue object
			var sampleVenue = new Venues({
				name: 'New Venue'
			});

			// Set the URL parameter
			$stateParams.venueId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/venues\/([0-9a-fA-F]{24})$/).respond(sampleVenue);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.venue).toEqualData(sampleVenue);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Venues) {
			// Create a sample Venue object
			var sampleVenuePostData = new Venues({
				name: 'New Venue'
			});

			// Create a sample Venue response
			var sampleVenueResponse = new Venues({
				_id: '525cf20451979dea2c000001',
				name: 'New Venue'
			});

			// Fixture mock form input values
			scope.name = 'New Venue';

			// Set POST response
			$httpBackend.expectPOST('venues', sampleVenuePostData).respond(sampleVenueResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Venue was created
			expect($location.path()).toBe('/venues/' + sampleVenueResponse._id);
		}));

		it('$scope.update() should update a valid Venue', inject(function(Venues) {
			// Define a sample Venue put data
			var sampleVenuePutData = new Venues({
				_id: '525cf20451979dea2c000001',
				name: 'New Venue'
			});

			// Mock Venue in scope
			scope.venue = sampleVenuePutData;

			// Set PUT response
			$httpBackend.expectPUT(/venues\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/venues/' + sampleVenuePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid venueId and remove the Venue from the scope', inject(function(Venues) {
			// Create new Venue object
			var sampleVenue = new Venues({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Venues array and include the Venue
			scope.venues = [sampleVenue];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/venues\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleVenue);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.venues.length).toBe(0);
		}));
	});
}());