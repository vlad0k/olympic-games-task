const startTime = Date.now();

const sqlite3 = require('sqlite3').verbose(),
      fs = require('fs'),
      readline = require('readline');

const db = new sqlite3.Database('./db/olympic_history.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.\n');
});

const dbCleaner = require('./database_filler/db_cleaner')
      athletes = require('./database_filler/athletes'),
      teams = require('./database_filler/teams');

let inputFilePath = `./csv/athlete_events.csv`,
    inputStream = fs.createReadStream(inputFilePath),
    rl = readline.createInterface(inputStream,),
    inputData = [];

let lineSplitter = (line) => {
  lineSplits = line
    .split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/g)
    .map((currentValue) =>
      currentValue[0] == '"' && currentValue[currentValue.length - 1] == '"' ?
        currentValue.substr(1, currentValue.length - 2)
      :
        currentValue
    )
  inputData.push(lineSplits);
  delete lineSplits;
}

rl
  .on('line', lineSplitter)
  .on('close', () => {
      console.log(`Done reading file.\n`, 'Time: ' +  ((Date.now() - startTime) / 1000));
      db.serialize(() => {
        dbCleaner.clean(db);


        athletes.importer(db, inputData, athletes.athletes);
        teams.importer(db, inputData, teams.teams);
        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log('\nThe database connection is closed.\n' +
                      'Time: ' +  ((Date.now() - startTime) / 1000));
        });

      }

      );


  });
