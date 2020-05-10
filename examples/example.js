// $ node example.js
const getResultSport = require('../index');

// https://www.sofascore.com/fr/football/2020-01-03
getResultSport.get('soccer', 'Bordeaux Le Mans', new Date('2020-01-03')).then((result) => {
    console.log(result);
});