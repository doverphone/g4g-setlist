'use strict';

//Setting up route
angular.module('setlists').config(['$stateProvider',
	function($stateProvider) {
		// Setlists state routing
		$stateProvider.
		state('listSetlists', {
			url: '/setlists',
			templateUrl: 'modules/setlists/views/list-setlists.client.view.html',
			controller: 'SetlistsController',
			resolve: {
				setlists: ['Setlists', function(Setlists){
					return Setlists.query().$promise;
				}]
			}
		}).
		state('createSetlist', {
			url: '/setlists/create',
			templateUrl: 'modules/setlists/views/create-setlist.client.view.html',
			controller: 'SetlistsCreateController'
		}).
		state('viewSetlist', {
			url: '/setlists/:setlistId',
			templateUrl: 'modules/setlists/views/view-setlist.client.view.html',
			controller: 'SetlistsViewController',
			resolve: {
				setlist: ['Setlists', '$stateParams', function(Setlists, $stateParams){
					return Setlists.get({setlistId: $stateParams.setlistId});
				}]
			}

		}).
		state('editSetlist', {
			url: '/setlists/:setlistId/edit',
			templateUrl: 'modules/setlists/views/edit-setlist.client.view.html'
		});
	}
]);