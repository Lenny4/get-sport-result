# Installation
```
$ npm install get-sport-result
```

#Usage
- Soccer:
```
const getResultSport = require('get-sport-result');
getResultSport.get(getResultSport.options.sport.SOCCER, 'Bordeaux Le Mans', new Date('2020-01-03')).then((result) => {
    console.log(result);
});
// check result https://www.sofascore.com/fr/football/2020-01-03
```