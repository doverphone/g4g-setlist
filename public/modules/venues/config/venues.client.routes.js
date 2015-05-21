'use strict';

//Setting up route
angular.module('venues').config(['$stateProvider',
	function($stateProvider) {
		// Venues state routing
		$stateProvider.
		state('listVenues', {
			url: '/venues',
			templateUrl: 'modules/venues/views/list-venues.client.view.html'
		}).
		state('createVenue', {
			url: '/venues/create',
			templateUrl: 'modules/venues/views/create-venue.client.view.html'
		}).
		state('viewVenue', {
			url: '/venues/:venueId',
			templateUrl: 'modules/venues/views/view-venue.client.view.html'
		}).
		state('editVenue', {
			url: '/venues/:venueId/edit',
			templateUrl: 'modules/venues/views/edit-venue.client.view.html'
		});
	}
]);