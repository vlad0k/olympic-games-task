let athletes = {}; //dictionary of athletes id
let athletesIDs = {};

function importer(db, inputData, athletes, teamIDs, athletesIDs){
		inputData.forEach((elem) => { // edits name and creates dictionary athletes

			if (athletes[elem[0]] == undefined && elem != inputData[0]){
				athletes[elem[0]] = {
					'fullName': elem[1].replace(/[\(\"].*?[\)\"]/gi, ''),
					'age': elem[3],
					'sex': elem[2] == 'M' ? 0 : 1,
					'params': {},
					'teamID': teamIDs[elem[7]]
				}
				if (elem[4] != 'NA')
					athletes[elem[0]].params.heigth = elem[4];
				if (elem[5] != 'NA')
					athletes[elem[0]].params.weigth = elem[5];
			}
		});

		athletesSQL = `INSERT INTO athletes(full_name,sex, age, params, team_id) VALUES ($fullName, $sex, $age, $params, $teamID)`;
		db.serialize(() => {

			db.run('BEGIN TRANSACTION');
			var stmt = db.prepare(athletesSQL);
			var i = 0;
			for(key in athletes){
				stmt.run({
					$fullName: athletes[key].fullName,
					$sex: athletes[key].sex,
					$age: athletes[key].age,
					$params: JSON.stringify(athletes[key].params),
					$teamID: athletes[key].teamID
				});
				athletesIDs[athletes[key].fullName] = ++i;
			}

			stmt.finalize();
			db.run('COMMIT');
		});


}
module.exports.importer = importer;
module.exports.athletes = athletes;
module.exports.athletesIDs = athletesIDs;


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
//   'NA'
// 135571
