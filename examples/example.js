// $ node example.js
const getResultSport = require('../index.js');

// check result here : https://www.sofascore.com/fr/football/2020-01-03
getResultSport.get(getResultSport.options.sport.SOCCER, 'Bordeaux Le Mans', new Date('2020-01-03')).then((result) => {
    console.log(result);
});

// runners param is available only for HORSE_RACING
// check result here : https://www.racingpost.com/results/2020-01-15
// here the param runners is use to find the race (see src/supplier/racingpost.js)
getResultSport.get(getResultSport.options.sport.HORSE_RACING, 'newbury', new Date('2020-01-15'), {
    runners: [
        'Bond\'s Lover',
        'Martha Brae',
        'Crossgalesfamegame',
        'Getaway Totherock ',
        'Aimee De Sivola ',
        'Thats The Truth',
        'Urban Artist',
        'Just Henny',
        'Fforbidden Love',
        'Scarlett Of Tara'
    ],
}).then((result) => {
    console.log(result);
});