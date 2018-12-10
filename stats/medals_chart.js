const sqlite3 = require('sqlite3').verbose();
const EventEmmiter = require('events');

function medals(params) {

  var params = checkInput(params);

  if (params == false) {
    return;
  }
  getChart(params);
}

function checkInput(params) { // returns object with command line params

  let medalParams = {};

  params.forEach((elem) => {
    medalParams.medal = '0';

    switch(elem) {
      case 'summer':
        medalParams.season = 'Summer';
        break;
      case 'winter':
        medalParams.season = 'Winter';
        break;
      case 'gold':
        medalParams.medal = 1;
        break;
      case 'silver':
        medalParams.medal = 2;
        break;
      case 'bronze':
        medalParams.medal = 3;
        break;
    }

    if (elem.length == 3){
      medalParams.noc = elem.toUpperCase();
    }
  });

  if (medalParams.season == undefined && medalParams.noc == undefined){
    console.log('Season and NOC params are required');
    return false;
  }
  else if (medalParams.season == undefined){
    console.log('Season param is required');
    return false;
  }
  else if (medalParams.noc == undefined){
    console.log('NOC param is required');
    return false;
  }


  return medalParams;
}

function getChart(params) {
  const db = new sqlite3.Database('./db/olympic_history.db', sqlite3.OPEN_READONLY);
  const dbEvents = new EventEmmiter();

  db.all(`SELECT id FROM teams WHERE noc_name = (?)`, [params.noc], (err, rows) => {
    params.teamID = rows[0].id;
    dbEvents.emit('gotTeamId');
  });

  dbEvents.on('gotTeamId', () =>{
    db.all('SELECT id FROM athletes WHERE team_id = (?)', [params.teamID], (err, rows) => {
      params.athleteIDs = [];
      for (i in rows){
        params.athleteIDs.push(rows[i].id);
      }
      dbEvents.emit('gotAthlIDs');
    });
  });

  dbEvents.on('gotAthlIDs', () => {
    db.all(`SELECT id, year FROM games WHERE season = ?`, params.season, (err, rows) => {
      params.games = rows;
      dbEvents.emit('gotGames');
    });
  });

  dbEvents.on('gotGames', () =>{
    var checkGamesSQL = `game_id = (${params.games[0].id}`;
    for (key in params.games){
      checkGamesSQL += (key != 0) ? (' OR ' + params.games[key].id) : '';
    }
    checkGamesSQL += ')';
    var checkMedalSQL = 'AND (medal'
    if (params.medal != 0){
      checkMedalSQL += ` = ${params.medal})`;
    }
    else {
      checkMedalSQL += ' != 0)'
    }
    console.log(`SELECT athlete_id, game_id FROM results WHERE medal ${params.medal != 0 ? '= '+params.medal : '!= 0'}`);
    db.all(`SELECT athlete_id, game_id FROM results WHERE medal ${params.medal != 0 ? '= '+params.medal : '!= 0'}`, (err, rows) => {
      //check and count
    })
  });
}


module.exports = medals;
