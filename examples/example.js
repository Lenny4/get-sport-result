const getResultSport = require('../index');

getResultSport.get('foot', 'PSG Marseille', new Date()).then((result) => {
    console.log(result);
});