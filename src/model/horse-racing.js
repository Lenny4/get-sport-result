module.exports = class HorseRacing {
    constructor() {
        this.runners = null;
    }

    hydrateRacingPost(runners) {
        this.runners = runners;
    }
};