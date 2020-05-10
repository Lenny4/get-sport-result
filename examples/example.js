// $ node example.js
const getResultSport = require('../index');

// https://www.sofascore.com/fr/football/2020-01-03
getResultSport.get(getResultSport.options.sport.SOCCER, 'Bordeaux Le Mans', new Date('2020-01-03')).then((result) => {
    console.log(result);
});