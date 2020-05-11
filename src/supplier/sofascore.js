const superagent = require('superagent');
const options = require('../options');
const Soccer = require('../model/soccer');
const stringSimilarity = require('string-similarity');

module.exports = {
    url: 'https://www.sofascore.com/%sport%//%date%/json',

    async get(sport, name, date) {
        let result = null;
        switch (sport) {
            case options.sport.SOCCER:
                result = await this.getSoccer(name, date);
                break;
        }
        return result;
    },

    async getSoccer(name, date) {
        const url = this.url.replace('%sport%', 'football').replace('%date%', this.convertDate(date));
        const response = await superagent.get(url);
        const sofascoreResult = this.findEvent(JSON.parse(response.text), name);
        const soccer = new Soccer();
        return soccer.hydrateSofascore(sofascoreResult);
    },

    findEvent(response, name) {
        const allEventsName = [];
        response.sportItem.tournaments.forEach((tournament) => {
            tournament.events.forEach((event) => {
                allEventsName.push(event.name);
            });
        });
        const bestMatchName = stringSimilarity.findBestMatch(name, allEventsName).bestMatch.target;
        for (const tournament of response.sportItem.tournaments) {
            for (const event of tournament.events) {
                if (event.name === bestMatchName) {
                    return event;
                }
            }
        }
    },

    convertDate(date) {
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return year + '-' + month + '-' + day;
    },
};