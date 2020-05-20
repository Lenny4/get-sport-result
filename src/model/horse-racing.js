module.exports = class HorseRacing {
    constructor() {
        this.status = null;
        this.runners = null;
    }

    hydrateRacingPost(runners, status) {
        this.status = status;
        this.runners = runners;
    }
};