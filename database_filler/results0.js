let results = []; // dictionary NOC : country
var resultsIDs = {};

function importer(db, inputData, results, athletesIDs, gamesIDs, sportsIDs, eventsIDs){
	indexDrop = `DROP INDEX IF EXIST db.results`;

	teamRowImportSQL = `INSERT INTO results(athlete_id, game_id, sport_id, event_id, medal) VALUES (?, ?, ?, ?, ?)`;

	inputData.forEach((elem) => {
    if (elem != inputData[0]) {
      var medal;
      switch (elem[14]){
        case 'NA':
          medal = 0;
          break;
        case 'Gold':
          medal = 1;
          break;
        case 'Silver':
          medal = 2;
          break;
        case 'Bronze':
          medal = 3;
          break;
      }

          results.push({
            'athleteID': athletesIDs[elem[1].replace(/[\(\"].*?[\)\"]/gi, '')],
            'gameId': gamesIDs[elem[8]],
            'sportId': sportsIDs[elem[12]],
            'eventId': eventsIDs[elem[13]],
            'medal': medal
          });
    }
	});

	db.serialize( () => {
		db.run('BEGIN TRANSACTION');
    var i = 0;
		for (key in results) {

			db.run(teamRowImportSQL, [results[key].athleteID, results[key].gameId, results[key].sportId, results[key].eventId, results[key].medal]);
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
