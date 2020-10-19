export function parsingForexApiAnswer(apiAnswer={rates:{}}){

    var forexRates : [string[],unknown[]];


    if (apiAnswer && apiAnswer["rates"] ){
        var currencies = Object.keys(apiAnswer["rates"])
        var rates = Object.values(apiAnswer["rates"])
        forexRates = [currencies,rates]
    }
    else{
        forexRates =  [["USD","SGD"],[0,0]]
    }
    return forexRates
  }