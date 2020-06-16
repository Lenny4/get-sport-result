# get-sport-result
get-sport-result is an npm package for obtaining the results of different types of sports such as football or horse racing.
We get the results on different platforms like https://www.sofascore.com/ or https://www.racingpost.com/

## Installation
```
$ npm install get-sport-result
```

## Warning
The sofascore supplier is protected, so we use puppeteer to get the result from their (private) API.
This means that it might take some time and use a lot of resources on your machine to get multiple results.

Sofascore ban ip wich does too much requests.

## Usage
- Horse Racing:
```javascript
// runners param is available only for HORSE_RACING
// check result here : https://www.racingpost.com/results/2020-01-15
// here the param runners is use to find the race (see src/supplier/racingpost.js)
// all runners are not required but it help to find the correct race
const getResultSport = require('get-sport-result');
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
```
Expected output:
```
HorseRacing {
  status: 'finished',
  runners: [
    { name: "Bond's Lover", position: 1, number: 6 },
    { name: 'Martha Brae', position: 2, number: 4 },
    { name: 'Crossgalesfamegame', position: 3, number: 2 },
    { name: 'Getaway Totherock', position: 4, number: 3 },
    { name: 'Aimee De Sivola', position: 5, number: 1 },
    { name: 'Thats The Truth', position: 6, number: 10 },
    { name: 'Urban Artist', position: 7, number: 11 },
    { name: 'Just Henny', position: 8, number: 8 },
    { name: 'Fforbidden Love', position: null, number: 7 },
    { name: 'Scarlett Of Tara', position: null, number: 9 }
  ]
}

```

- Soccer:
```javascript
const getResultSport = require('get-sport-result');
getResultSport.get(getResultSport.options.sport.SOCCER, 'Bordeaux Le Mans', new Date('2020-01-03')).then((result) => {
    console.log(result);
});
// check result https://www.sofascore.com/fr/football/2020-01-03
```
Expected output:
```
Soccer {
  status: 'finished',
  homeTeam: 'Bordeaux',
  awayTeam: 'Le Mans',
  homeScore: 2,
  awayScore: 0,
  winner: 'homeTeam',
  startTimestamp: 1578081300,
  incidents: [
    {
      incidentType: 'period',
      incidentClass: 'period',
      time: 90,
      team: null,
      player: null
    },
    {
      incidentType: 'goal',
      incidentClass: 'regulargoal',
      time: 90,
      team: 'homeTeam',
      player: 'Toma Bašić'
    },
    {
      incidentType: 'injuryTime',
      incidentClass: 'injuryTime',
      time: 90,
      team: null,
      player: null
    },
    {
      incidentType: 'substitution',
      incidentClass: 'substitutionin',
      time: 85,
      team: 'homeTeam',
      player: null
    },
    {
      incidentType: 'substitution',
      incidentClass: 'substitutionin',
      time: 83,
      team: 'awayTeam',
      player: null
    },
    {
      incidentType: 'substitution',
      incidentClass: 'substitutionin',
      time: 75,
      team: 'homeTeam',
      player: null
    },
    {
      incidentType: 'substitution',
      incidentClass: 'substitutionin',
      time: 74,
      team: 'awayTeam',
      player: null
    },
    {
      incidentType: 'substitution',
      incidentClass: 'substitutionin',
      time: 68,
      team: 'awayTeam',
      player: null
    },
    {
      incidentType: 'substitution',
      incidentClass: 'substitutionin',
      time: 65,
      team: 'homeTeam',
      player: null
    },
    {
      incidentType: 'card',
      incidentClass: 'yellowcard',
      time: 61,
      team: 'homeTeam',
      player: 'Youssouf Sabaly'
    },
    {
      incidentType: 'goal',
      incidentClass: 'penalty',
      time: 53,
      team: 'homeTeam',
      player: 'Jimmy Briand'
    },
    {
      incidentType: 'card',
      incidentClass: 'yellowcard',
      time: 52,
      team: 'awayTeam',
      player: 'Alois Confais'
    },
    {
      incidentType: 'period',
      incidentClass: 'period',
      time: 45,
      team: null,
      player: null
    },
    {
      incidentType: 'card',
      incidentClass: 'yellowcard',
      time: 45,
      team: 'awayTeam',
      player: 'Bevic Selad Moussiti Oko'
    },
    {
      incidentType: 'injuryTime',
      incidentClass: 'injuryTime',
      time: 45,
      team: null,
      player: null
    }
  ]
}
```
## Test
```bash
$ npm test
```

## Contributing
Pull requests are welcome.

## TODO
##### implement new way to get soccer results:
- https://www.api-football.com/documentation#teams-data
- https://www.api-football.com/documentation#fixtures-h2h-requests
- https://www.jokecamp.com/blog/guide-to-football-and-soccer-data-and-apis/#footballdata

##### implement other sports (tennis, basket ...)

##### write more tests

## License
MIT
