const options = require('./options');
const sofascore = require('./supplier/sofascore');

module.exports = {
    options: options,

    async get(sport, name, date, option = null) {
        if (option === null) {
            option = {
                supplier: options.supplier.SOFASCORE,
            };
        }
        let result = null;
        switch (option.supplier) {
            case options.supplier.SOFASCORE:
                result = await sofascore.get(sport, name, date);
                break;
        }
        return result;
    },
};