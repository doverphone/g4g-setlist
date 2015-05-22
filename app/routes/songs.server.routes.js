'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var songs = require('../../app/controllers/songs.server.controller');
	var multer = require('multer');

	// Songs Routes
	app.route('/songs')
		.get(songs.list)
		.post(users.requiresLogin, songs.create);

	app.route('/songs/upload').post(
		multer({dest: '../../public/upload'}), 
		songs.upload, 
		songs.readMp3
		// songs.create
	);

	app.route('/songs/:songId')
		.get(songs.read)
		.put(users.requiresLogin, songs.update)
		.delete(users.requiresLogin, songs.delete);

	

	// Finish by binding the Song middleware
	app.param('songId', songs.songByID);
};
