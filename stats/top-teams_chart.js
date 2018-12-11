const sqlite3 = require('sqlite3').verbose();


function topTeams(params) {
  params = checkInput(params);
  if (params == false){
    return;
  }

  getChart(params);
}

function checkInput(params) { // returns object with command line params

  let topTeamsParams = {};

  params.forEach((elem) => {
    topTeamsParams.medal = 0;

    switch(elem) {
      case 'summer':
        topTeamsParams.season = 'Summer';
        break;
      case 'winter':
        topTeamsParams.season = 'Winter';
        break;
      case 'gold':
        topTeamsParams.medal = 1;
        break;
      case 'silver':
        topTeamsParams.medal = 2;
        break;
      case 'bronze':
        topTeamsParams.medal = 3;
        break;
    }

    if (elem.length == 4 && elem != 'gold'){
      topTeamsParams.year = parseInt(elem);
    }

  });

  if (topTeamsParams.season == undefined ){
    console.log('Season params is missing');
    return false;
  }

  return topTeamsParams;
}

function getChart(params) {

  const db = new sqlite3.Database('./db/olympic_history.db', sqlite3.OPEN_READONLY);
  const MEDAL = params.medal

  let yearExp = (params.year == undefined ) ?  '' : `AND year = ${params.year}`;
  db.all(`
    SELECT noc_name AS noc, COUNT(medal) AS Amount FROM results
      LEFT JOIN athletes ON results.athlete_id = athletes.id
      LEFT JOIN games ON results.game_id = games.id
      LEFT JOIN teams ON athletes.team_id = teams.id
    WHERE medal = ${params.medal != 0 ? params.medal : '(1,2,3)'}
      AND
          season = $season
          ${yearExp}
    GROUP BY noc_name
    ORDER BY COUNT(medal) DESC
  `, {
    $season: params.season
  },
  (err,rows)=> {
    if(err){
      console.log(err.message);
      return;
    }
    params.result = rows;
    if (rows.length == 0){
      console.log("Result is empty for such params");
      return;
    }
    console.log('NOC', 'Amount');
    printBar(params.result);
  });
  db.close();
}

function printBar(result) {
  barSymbol = '█';
  max = 0;
  avg = 0;
  for (i in result){
    avg += result[i].Amount;
  }
  avg = parseInt(avg / result.length);
  result.forEach((elem) => {
    let bar = '';
    for(let i = 0; i < elem.Amount; i++){
      bar += barSymbol;
    }
    if(elem.Amount >= avg){
      console.log(elem.noc, bar + ' ' + elem.Amount);
    }

  });
}

module.exports = topTeams;
