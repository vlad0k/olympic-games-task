var eventsIDs = {}, i = 0;

function importer(db, inputData, eventsIDs){
	indexDrop = `DROP INDEX IF EXIST db.events`;

	teamRowImportSQL = `INSERT INTO events(name) VALUES (?)`;

	db.serialize( () => {
		db.run('BEGIN TRANSACTION');
		for (i in inputData) {
			db.run(teamRowImportSQL, inputData[i][13]);

		}

		db.run('COMMIT');
	});
}

module.exports.importer = importer;
module.exports.eventsIDs = eventsIDs;


// [ '2',
//   'A Lamusi',
//   'M',
//   '23',
//   '170',
//   '60',
//6   'China',
//7   'CHN',
//8   '2012 Summer',
//9   '2012',
//10   'Summer',
//11   'London',
//12   'Judo',
//13   'Judo Men\'s Extra-Lightweight',
//14   'NA' ]
