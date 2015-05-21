'use strict';

//Venues service used to communicate Venues REST endpoints
angular.module('venues').factory('Venues', ['$resource',
	function($resource) {
		return $resource('venues/:venueId', { venueId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);