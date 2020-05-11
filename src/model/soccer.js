module.exports = class Soccer {
    constructor() {
        this.status = null;
        this.homeTeam = null;
        this.awayTeam = null;
        this.homeScore = null;
        this.awayScore = null;
        this.winner = null;
        this.startTimestamp = null;
    }

    hydrateSofascore(sofascoreResult) {
        // todo create an Utils for the status (known status: ['finished', 'postponed'])
        // because each status has to be the same, no matter wich supplier is used
        this.status = sofascoreResult.status.type;
        this.homeTeam = sofascoreResult.homeTeam.name;
        this.awayTeam = sofascoreResult.awayTeam.name;
        if (typeof sofascoreResult.homeScore.current !== 'undefined') {
            this.homeScore = sofascoreResult.homeScore.current;
        }
        if (typeof sofascoreResult.awayScore.current !== 'undefined') {
            this.awayScore = sofascoreResult.awayScore.current;
        }
        this.startTimestamp = sofascoreResult.startTimestamp;
        if (sofascoreResult.winnerCode === 1) {
            this.winner = 'homeTeam';
        } else if (sofascoreResult.winnerCode === 2) {
            this.winner = 'awayTeam';
        }
        return this;
    }
};