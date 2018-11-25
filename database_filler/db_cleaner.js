
function clean (db) {
	db.serialize(() => {
			db.run('BEGIN');
	    db.run('DELETE FROM teams');
	    db.run('DELETE FROM athletes');
			db.run('DELETE FROM events');
			db.run('DELETE FROM games');
			db.run('DELETE FROM sports');
			db.run('DELETE FROM sqlite_sequence');
			db.run('END')
		});
}

module.exports.clean = clean;
