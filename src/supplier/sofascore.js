const superagent = require('superagent');
const options = require('../options');
const dateConverter = require('../date');
const Soccer = require('../model/soccer');
const stringSimilarity = require('string-similarity');
const slugify = require('slugify');
const baseUrl = 'https://www.sofascore.com';

module.exports = {
    urlFind: baseUrl + '/%sport%//%date%/json',
    urlFull: baseUrl + '/event/%id%/json',

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
        let url = this.urlFind.replace('%sport%', 'football').replace('%date%', dateConverter.convertDate(date));
        let response = await superagent.get(url);
        let sofascoreResult = this.findEvent(JSON.parse(response.text), name, option);
        if (sofascoreResult !== null && typeof sofascoreResult !== 'undefined') {
            url = this.urlFull.replace('%id%', sofascoreResult.id);
            response = await superagent.get(url);
            sofascoreResult = JSON.parse(response.text);
            console.log(url);

            const soccer = new Soccer();
            return soccer.hydrateSofascore(sofascoreResult, this.getStatus(sofascoreResult.event.status.type));
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

    getStatus(originalStatusName) {
        switch (originalStatusName) {
            case 'finished':
                return options.status.FINISHED;
            case 'postponed':
                return options.status.POSTPONED;
            case 'notstarted':
                return options.status.NOT_STARTED;
            case 'inprogress':
                return options.status.IN_PROGRESS;
            default:
                console.log('status ' + originalStatusName + ' is unknow please open a merge request here: https://github.com/Lenny4/get-sport-result/issues');
                return options.status.UNKNOWN;
        }
    },
};