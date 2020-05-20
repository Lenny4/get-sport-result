const superagent = require('superagent');
const dateConverter = require('../date');
const cheerio = require('cheerio');
const stringSimilarity = require('string-similarity');
const slugify = require('slugify');
const HorseRacing = require('../model/horse-racing');
const appUrl = 'https://www.racingpost.com';
const options = require('../options');

module.exports = {
    urlSearchByDate: appUrl + '/results/%date%',
    nbRunnerDisplayOnResultPage: 3,

    async getHorseRacing(name, date, option) {
        this.formatOptionRunners(option);
        const url = this.urlSearchByDate.replace('%date%', dateConverter.convertDate(date));
        const response = await superagent.get(url);
        const $ = cheerio.load(response.text);
        const raceNameEl = this.getRaceNameSection($, name, option);
        if (raceNameEl !== null) {
            const eventUrl = this.getEventUrl($, raceNameEl, option);
            const runners = await this.getResults(eventUrl);
            const horseRacing = new HorseRacing();
            horseRacing.hydrateRacingPost(runners, options.status.FINISHED);
            return horseRacing;
        }
        return null;
    },

    async getResults(eventUrl) {
        const runners = [];
        const response = await superagent.get(appUrl + eventUrl);
        const $ = cheerio.load(response.text);
        $('table.rp-horseTable__table tbody tr.rp-horseTable__mainRow').each((i, runnerEl) => {
            let position = $(runnerEl)
                .find('.rp-horseTable__pos__number')
                .text().trim()
                .replace(/ *\([^)]*\) */g, '');
            if (!isNaN(position)) {
                position = parseInt(position);
            } else {
                position = null;
            }
            const name = $(runnerEl).find('.rp-horseTable__horse__name').text().trim();
            const number = parseInt($(runnerEl).find('.rp-horseTable__saddleClothNo').text().trim());
            runners.push({
                name: name,
                position: position,
                number: number,
            });
        });
        return runners;
    },

    getRaceNameSection($, name, option) {
        let result = null;
        const slugifyName = slugify(name).toLowerCase();
        const sectionSelector = 'main div.rp-raceCourse h2.rp-raceCourse__row__name';
        const allSectionsName = [];
        $(sectionSelector).each((i, raceNameEl) => {
            allSectionsName.push(
                slugify(slugify($(raceNameEl).text()).toLowerCase())
            );
        });
        const bestMatch = stringSimilarity.findBestMatch(slugifyName, allSectionsName).bestMatch;
        if (bestMatch.rating > option.minRating) {
            $(sectionSelector).each((i, raceNameEl) => {
                if (slugify($(raceNameEl).text()).toLowerCase() === bestMatch.target) {
                    result = raceNameEl;
                }
            });
            return result;
        } else {
            return null;
        }
    },

    getEventUrl($, raceNameEl, option) {
        const ratingByRaces = [];
        const allListRunnerEl = $(raceNameEl).closest('section').find('ol.rp-raceCourse__panel__race__info__results');
        $(allListRunnerEl).each((indexListRunner, listRunnerEl) => {
            const runnerNames = [];
            $(listRunnerEl).find('.rp-raceCourse__panel__race__info__results__name__table__row').each((y, runnerNameEl) => {
                const runnerName = slugify($(runnerNameEl).text().replace(/[0-9]/g, '').replace('.', '')).toLowerCase();
                runnerNames.push(runnerName);
            });
            const rating = this.getRatingForRunners(runnerNames, option);
            ratingByRaces.push({
                rating: rating,
                indexListRunner: indexListRunner,
            });
        });
        const indexRaceNameEl = ratingByRaces.reduce((prev, current) => {
            return (prev.rating > current.rating) ? prev : current
        }).indexListRunner;
        return $($(allListRunnerEl)[indexRaceNameEl])
            .closest('.rp-raceCourse__panel__container')
            .find('a.rp-raceCourse__panel__race__info__buttons__link')
            .attr('href');
    },

    getRatingForRunners(runnerNames, option) {
        let bestMatchArray = [];
        let ratingRace = 0;
        option.runners.forEach((inputRunnerName) => {
            const bestMatch = stringSimilarity.findBestMatch(inputRunnerName, runnerNames).bestMatch;
            bestMatchArray.push(bestMatch.rating);
        });
        bestMatchArray = bestMatchArray.sort().reverse();
        for (let i = 0; i < this.nbRunnerDisplayOnResultPage; i++) {
            ratingRace += bestMatchArray[i];
        }
        ratingRace = ratingRace / this.nbRunnerDisplayOnResultPage;
        return ratingRace;
    },

    formatOptionRunners(option) {
        option.runners.forEach((inputRunnerName, i) => {
            option.runners[i] = slugify(inputRunnerName).toLowerCase();
        });
    },
};