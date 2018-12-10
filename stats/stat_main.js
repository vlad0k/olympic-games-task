// console.clear();

const medals = require('./medals_chart');
const topTeams = require('./top-teams_chart');
params = process.argv.splice(3);

if (params[0] == "medals"){
  medals(params.splice(1));
}
else if (params[0] == "top-teams") {
  topTeams(params.splice(1));
}
else{
  console.log('There is no such chart');
}
