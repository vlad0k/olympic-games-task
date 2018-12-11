function printChart(result) {
  barSymbol = '█';
  max = rows[0].Amount;
  console.log('Year', 'Amount');
  rows.forEach((elem) => {
    bar = '';
    for(i = 0; i < elem.Amount / max * 100; i++){
      bar += barSymbol;
    }
    console.log(elem.Year + ' ' + bar + ' ' + elem.Amount );
  })
}

module.exports = printChart;
