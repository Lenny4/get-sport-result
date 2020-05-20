const options = require('./options');
const sofascore = require('./supplier/sofascore');
const racingpost = require('./supplier/racingpost');

function getDefaultOption(sport) {
    return {
        supplier: getDefaultSupplier(sport),
        minRating: options.defaultMinRating,
    };
}

function getDefaultSupplier(sport) {
    switch (sport) {
        case options.sport.HORSE_RACING:
            return options.supplier.RACING_POST;
        default:
            return options.supplier.SOFASCORE;
    }
}

module.exports = {
    options: options,

    /**
     * @param sport
     * @param name
     * @param date
     * @param option: {supplier, minRating, runners}
     * @returns {Promise<null>}
     */
    async get(sport, name, date, option = null) {
        if (option === null) {
            option = getDefaultOption(sport);
        } else if (typeof option === 'object') {
            option.supplier = getDefaultSupplier(sport);
            if (typeof option.minRating === 'undefined') {
                option.minRating = options.defaultMinRating;
            }
        } else {
            throw 'option must be an object or null';
        }
        let result = null;
        switch (option.supplier) {
            case options.supplier.SOFASCORE:
                result = await sofascore.get(sport, name, date, option);
                break;
            case options.supplier.RACING_POST:
                result = await racingpost.getHorseRacing(name, date, option);
                break;
        }
        return result;
    },
};