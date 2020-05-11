const superagent = require('superagent');
const options = require('../options');
const dateConverter = require('../date');
const Soccer = require('../model/soccer');
const stringSimilarity = require('string-similarity');
const slugify = require('slugify');

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
        const url = this.url.replace('%sport%', 'football').replace('%date%', dateConverter.convertDate(date));
        const response = await superagent.get(url);
        const sofascoreResult = this.findEvent(JSON.parse(response.text), name, option);
        if (sofascoreResult !== null && typeof sofascoreResult !== 'undefined') {
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
                allEventsName.push(slugify(event.name).toLowerCase());
            }
        }
        const bestMatch = stringSimilarity.findBestMatch(slugify(name).toLowerCase(), allEventsName).bestMatch;
        if (bestMatch.rating > option.minRating) {
            for (const tournament of response.sportItem.tournaments) {
                for (const event of tournament.events) {
                    if (slugify(event.name).toLowerCase() === bestMatch.target) {
                        return event;
                    }
                }
            }
        } else {
            return null;
        }
    },
};