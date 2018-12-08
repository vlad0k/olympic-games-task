function medals(params) {
  medalParams = [];
  params.forEach((elem) => {
    switch(elem) {
      case 'summer':
        medalParams[1] = elem;
      case 'winter':
        medalParams[1] = elem;
      case 'gold':
        medalParams[2] = 1;
      case 'silver':
        medalParams[2] = 2;
      case 'bronze':
        medalParams[2] = 3;
    }
    if (elem.length == 3){
      medalParams[0] = elem.toUpperCase();
    }
  })
  console.log(medalParams);

}

module.exports = medals;
