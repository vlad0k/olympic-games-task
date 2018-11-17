function importer(db, inputData){
	teamRowImportSQL = `INSERT INTO teams(noc_name, name) VALUES (?, ?)`;
	db.run(teamRowImportSQL, [inputData[2][7],inputData[2][6]]);
	// inputData.forEach((elem) => {
	// 	reg = /-\n/i;
	// 	elem[6].replace(reg, '');
	// 	db.run(teamRowImportSQL, [elem[7],elem[6]]);
	// });
}

module.exports.importer = importer;


// [ '2',
//   'A Lamusi',
//   'M',
//   '23',
//   '170',
//   '60',
//   'China',
//   'CHN',
//   '2012 Summer',
//   '2012',
//   'Summer',
//   'London',
//   'Judo',
//   'Judo Men\'s Extra-Lightweight',
//   'NA' ]

