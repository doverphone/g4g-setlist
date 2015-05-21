'use strict';

// Configuring the Articles module
angular.module('venues').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Venues', 'venues', 'dropdown', '/venues(/create)?');
		Menus.addSubMenuItem('topbar', 'venues', 'List Venues', 'venues');
		Menus.addSubMenuItem('topbar', 'venues', 'New Venue', 'venues/create');
	}
]);