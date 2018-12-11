const sqlite3 = require('sqlite3').verbose();

function medals(params) {

  params = checkInput(params);

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
  db.all(`
    SELECT year as Year, COUNT(medal) AS Amount FROM results
      LEFT JOIN athletes ON results.athlete_id = athletes.id
      LEFT JOIN games ON results.game_id = games.id
      LEFT JOIN teams ON athletes.team_id = teams.id
    WHERE medal = ${params.medal ? params.medal : '(1,2,3)'}
      AND
          noc_name = $noc
      AND
          season = $season
    GROUP BY year
    ORDER BY year DESC
  `, {
    $noc: params.noc,
    $season: params.season
  },
  (err,rows)=> {
    if(err){
      console.log(err.message);
      return;
    }
    params.result = rows;
    console.log('Year', 'Amount');
    printBar(params.result);
  });
  db.close();
}

function printBar(result) {
  barSymbol = '█';
  max = 0;
  for(i in result){
    max = result[i].Amount > max ? result[i].Amount : max;
  }

  result.forEach((elem) => {
    bar = '';
    for(let i = 0; i < (elem.Amount / max * 100); i++){
      bar += barSymbol;
    }
    console.log((elem.Year != undefined ? elem.Year : elem.noc)  + ' ' + bar + ' ' + elem.Amount );
  })
}


module.exports = medals;
