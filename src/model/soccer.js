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
        this.status = sofascoreResult.status.type;
        this.homeTeam = sofascoreResult.homeTeam.name;
        this.awayTeam = sofascoreResult.awayTeam.name;
        this.homeScore = sofascoreResult.homeScore.current;
        this.awayScore = sofascoreResult.awayScore.current;
        this.startTimestamp = sofascoreResult.startTimestamp;
        if (this.homeScore > this.awayScore) {
            this.winner = 'homeTeam';
        } else if (this.homeScore < this.awayScore) {
            this.winner = 'awayTeam';
        }
        return this;
    }
};