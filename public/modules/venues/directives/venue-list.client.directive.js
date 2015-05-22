'use strict';

angular.module('venues').directive('venueList', ['Venues',
	function(Venues) {
		return {
			templateUrl: 'modules/venues/directives/venue-list.client.directive.html',
			restrict: 'E',
			scope: {
				selectedVenue: '=ngModel'
			},
			link: function postLink(scope, element, attrs) {
				console.log('venue list directive');
				scope.venues = Venues.query();
			}
		};
	}
]);