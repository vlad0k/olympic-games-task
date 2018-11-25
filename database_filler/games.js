let games = {}; // dictionary NOC : country
var gamesIDs = {};

function importer(db, inputData, games, gamesIDs){
	indexDrop = `DROP INDEX IF EXIST db.games`;

	teamRowImportSQL = `INSERT INTO games(year, season, city) VALUES (?, ?, ?)`;

	inputData.forEach((elem) => {
		if (games[elem[8]] == undefined && elem != inputData[0]) {
			games[elem[8]] = {
        'year': elem[9],
        'season': elem[10],
        'city': elem[11]
      }
		}
	});

	db.serialize( () => {
		db.run('BEGIN TRANSACTION');
    var i = 0;
		for (key in games) {
			db.run(teamRowImportSQL, [games[key].year, games[key].season, games[key].city]);
			gamesIDs[key] = ++i;
		}

		db.run('COMMIT');
	});
}

module.exports.importer = importer;
module.exports.games = games;
module.exports.gamesIDs = gamesIDs;

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
