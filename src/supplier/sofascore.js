const puppeteer = require('puppeteer');
const options = require('../options');
const dateConverter = require('../date');
const Soccer = require('../model/soccer');
const stringSimilarity = require('string-similarity');
const slugify = require('slugify');
const baseUrl = 'https://www.sofascore.com';

module.exports = {
    urlFinds: [
        baseUrl + '/%sport%//%date%/json',
        baseUrl + '/%sport%//%date%/inverse/json',
    ],
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
        let url, response, sofascoreResult;
        for await (let urlFind of this.urlFinds) {
            url = urlFind.replace('%sport%', 'football').replace('%date%', dateConverter.convertDate(date));
            response = await this.getJsonPuppeteer(url);
            sofascoreResult = this.findEvent(response, name, option);
            if (sofascoreResult !== null) {
                break;
            }
        }
        if (sofascoreResult !== null && typeof sofascoreResult !== 'undefined') {
            url = this.urlFull.replace('%id%', sofascoreResult.id);
            sofascoreResult = await this.getJsonPuppeteer(url);

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
            case 'canceled':
                return options.status.CANCELED;
            default:
                console.log('status ' + originalStatusName + ' is unknow please open a merge request here: https://github.com/Lenny4/get-sport-result/issues');
                return options.status.UNKNOWN;
        }
    },

    async getJsonPuppeteer(url) {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto(url);
        const result = await page.evaluate(() => JSON.parse(document.querySelector("body").innerText));
        await browser.close();
        return result;
    }
};