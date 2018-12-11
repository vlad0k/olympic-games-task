function printChart(result) {
  barSymbol = '█';
  max = 0;
  for(i in result){
    max = result[i].Amount > max ? result[i].Amount : max;
  }

  result.forEach((elem) => {
    bar = '';
    for(i = 0; i < elem.Amount / max * 100; i++){
      bar += barSymbol;
    }
    console.log((elem.Year != undefined ? elem.Year : elem.noc)  + ' ' + bar + ' ' + elem.Amount );
  })
}

module.exports = printChart;
