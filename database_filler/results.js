let results = {}; // dictionary NOC : country
var resultsIDs = {};

function importer(db, inputData, results, gamesIDs){
	indexDrop = `DROP INDEX IF EXIST db.results`;

	teamRowImportSQL = `INSERT INTO results(year, season, city) VALUES (?, ?, ?)`;

	inputData.forEach((elem) => {
    for (key in athletesIDs){
      if (results[athletesIDs[key]] == undefined && elem != inputData[0]) {
        results[athletesIDs[key]].gameId = 
  		}
    }

	});

	db.serialize( () => {
		db.run('BEGIN TRANSACTION');
    var i = 0;
		for (key in results) {
			db.run(teamRowImportSQL, [games[key].year, games[key].season, games[key].city]);
			resultsIDs[key] = ++i;
		}

		db.run('COMMIT');
	});
}

module.exports.importer = importer;
module.exports.results = results;
module.exports.resultsIDs = resultsIDs;

// [ '2',
//   'A Lamusi',
//   'M',
//   '23',
//   '170',
//   '60',
//6   'China',
//7   'CHN',
//8 '2012 Summer',
//9 '2012',
//10 'Summer',
//11 'London',
//12   'Judo',
//13   'Judo Men\'s Extra-Lightweight',
//14   'NA' ]
