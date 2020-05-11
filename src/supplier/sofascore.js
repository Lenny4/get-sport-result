const superagent = require('superagent');
const options = require('../options');
const Soccer = require('../model/soccer');
const stringSimilarity = require('string-similarity');

module.exports = {
    url: 'https://www.sofascore.com/%sport%//%date%/json',

    async get(sport, name, date, option) {
        let result = null;
        switch (sport) {
            case options.sport.SOCCER:
                result = await this.getSoccer(name, date, option);
                break;
        }
        return result;
    },

    async getSoccer(name, date, option) {
        const url = this.url.replace('%sport%', 'football').replace('%date%', this.convertDate(date));
        const response = await superagent.get(url);
        const sofascoreResult = this.findEvent(JSON.parse(response.text), name, option);
        if (sofascoreResult !== null) {
            const soccer = new Soccer();
            return soccer.hydrateSofascore(sofascoreResult);
        } else {
            return null;
        }
    },

    findEvent(response, name, option) {
        const allEventsName = [];
        for (const tournament of response.sportItem.tournaments) {
            for (const event of tournament.events) {
                allEventsName.push(event.name);
            }
        }
        const bestMatch = stringSimilarity.findBestMatch(name, allEventsName).bestMatch;
        if (bestMatch.rating > option.minRating) {
            for (const tournament of response.sportItem.tournaments) {
                for (const event of tournament.events) {
                    if (event.name === bestMatch.target) {
                        return event;
                    }
                }
            }
        } else {
            return null;
        }
    },

    convertDate(date) {
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return year + '-' + month + '-' + day;
    },
};