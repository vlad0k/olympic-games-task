var events = {};
var eventsIDs = {};

function importer(db, inputData, eventsIDs, events){
	indexDrop = `DROP INDEX IF EXIST db.events`;

	teamRowImportSQL = `INSERT INTO events(name) VALUES (?)`;

	inputData.forEach((elem) => {
		if (events[elem[13]] == undefined && elem != inputData[0]) {
			events[elem[13]] = 0;
		}
	});

	db.serialize( () => {
		db.run('BEGIN TRANSACTION');
		var i = 0;
		for (key in events) {
			db.run(teamRowImportSQL, key);
			eventsIDs[key] = ++i;
		}
		console.log(eventsIDs);
		db.run('COMMIT');
	});
}

module.exports.importer = importer;
module.exports.eventsIDs = eventsIDs;
module.exports.events = events;


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
