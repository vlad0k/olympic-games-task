const medals = require(./medals_chart);
const topTeams = require(./top-teams_chart);
params = process.argv.splice(3);

if (params[0] == "medals"){
  medals();
} else {
  topTeams();
}
