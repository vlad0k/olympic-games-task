var sports = {};
var sportsIDs = {};

function importer(db, inputData, sportsIDs, sports){
	indexDrop = `DROP INDEX IF EXIST db.sports`;

	teamRowImportSQL = `INSERT INTO sports(name) VALUES (?)`;

	inputData.forEach((elem) => {
		if (sports[elem[12]] == undefined && elem != inputData[0]) {
			sports[elem[12]] = 0;
		}
	});

	db.serialize( () => {
		db.run('BEGIN TRANSACTION');
		let insert = db.prepare(teamRowImportSQL);
		var i = 0;
		for (key in sports) {
			insert.run(key);
			sportsIDs[key] = ++i;
		}
		insert.finalize();
		db.run('COMMIT');
	});
}

module.exports.importer = importer;
module.exports.sportsIDs = sportsIDs;
module.exports.sports = sports;
