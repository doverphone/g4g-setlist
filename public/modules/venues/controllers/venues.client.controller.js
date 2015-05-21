'use strict';

// Venues controller
angular.module('venues').controller('VenuesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Venues',
	function($scope, $stateParams, $location, Authentication, Venues) {
		$scope.authentication = Authentication;

		// Create new Venue
		$scope.create = function() {
			// Create new Venue object
			var venue = new Venues ({
				name: this.name
			});

			// Redirect after save
			venue.$save(function(response) {
				$location.path('venues/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Venue
		$scope.remove = function(venue) {
			if ( venue ) { 
				venue.$remove();

				for (var i in $scope.venues) {
					if ($scope.venues [i] === venue) {
						$scope.venues.splice(i, 1);
					}
				}
			} else {
				$scope.venue.$remove(function() {
					$location.path('venues');
				});
			}
		};

		// Update existing Venue
		$scope.update = function() {
			var venue = $scope.venue;

			venue.$update(function() {
				$location.path('venues/' + venue._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Venues
		$scope.find = function() {
			$scope.venues = Venues.query();
		};

		// Find existing Venue
		$scope.findOne = function() {
			$scope.venue = Venues.get({ 
				venueId: $stateParams.venueId
			});
		};
	}
]);