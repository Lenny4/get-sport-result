const options = require('./options');
const sofascore = require('./supplier/sofascore');

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
     * @param option: {supplier, minRating}
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
        }
        return result;
    },
};