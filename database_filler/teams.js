let teams = {}; // dictionary NOC : country
var teamIDs = {}, i = 0;

function importer(db, inputData, teams){
	indexDrop = `DROP INDEX IF EXIST db.teams`;

	teamRowImportSQL = `INSERT INTO teams(noc_name, name) VALUES (?, ?)`;

	inputData.forEach((elem) => {
		elem[6].replace(/-\n/i, '');
		if (teams[elem[7]] == undefined && elem != inputData[0]) {
			teams[elem[7]] = elem[6];
		}
	});

	db.serialize( () => {
		db.run('BEGIN TRANSACTION');
		let insert = db.prepare(teamRowImportSQL);
		for (key in teams) {
			insert.run([key,teams[key]]);
			teamIDs[key] = ++i;
		}
		insert.finalize();
		db.run('COMMIT');
	});
}

module.exports.importer = importer;
module.exports.teams = teams;
module.exports.teamIDs = teamIDs;



// [ '2',
//   'A Lamusi',
//   'M',
//   '23',
//   '170',
//   '60',
//6   'China',
//7   'CHN',
//   '2012 Summer',
//   '2012',
//   'Summer',
//   'London',
//   'Judo',
//   'Judo Men\'s Extra-Lightweight',
//   'NA' ]
