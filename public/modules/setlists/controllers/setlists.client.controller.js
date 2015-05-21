'use strict';

// Setlists controller
angular.module('setlists').controller('SetlistsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Setlists',
	function($scope, $stateParams, $location, Authentication, Setlists) {
		$scope.authentication = Authentication;

		// Create new Setlist
		$scope.create = function() {
			// Create new Setlist object
			var setlist = new Setlists ({
				name: this.name
			});

			// Redirect after save
			setlist.$save(function(response) {
				$location.path('setlists/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Setlist
		$scope.remove = function(setlist) {
			if ( setlist ) { 
				setlist.$remove();

				for (var i in $scope.setlists) {
					if ($scope.setlists [i] === setlist) {
						$scope.setlists.splice(i, 1);
					}
				}
			} else {
				$scope.setlist.$remove(function() {
					$location.path('setlists');
				});
			}
		};

		// Update existing Setlist
		$scope.update = function() {
			var setlist = $scope.setlist;

			setlist.$update(function() {
				$location.path('setlists/' + setlist._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Setlists
		$scope.find = function() {
			$scope.setlists = Setlists.query();
		};

		// Find existing Setlist
		$scope.findOne = function() {
			$scope.setlist = Setlists.get({ 
				setlistId: $stateParams.setlistId
			});
		};
	}
]);