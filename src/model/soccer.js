module.exports = class Soccer {
    constructor() {
        this.status = null;
        this.homeTeam = null;
        this.awayTeam = null;
        this.homeScore = null;
        this.awayScore = null;
        this.winner = null;
        this.startTimestamp = null;
        this.incidents = [];
    }

    hydrateSofascore(sofascoreResult, status) {
        this.status = status;
        this.homeTeam = sofascoreResult.event.homeTeam.name;
        this.awayTeam = sofascoreResult.event.awayTeam.name;
        if (typeof sofascoreResult.event.homeScore.current !== 'undefined') {
            this.homeScore = sofascoreResult.event.homeScore.current;
        }
        if (typeof sofascoreResult.event.awayScore.current !== 'undefined') {
            this.awayScore = sofascoreResult.event.awayScore.current;
        }
        this.startTimestamp = sofascoreResult.event.startTimestamp;
        if (sofascoreResult.event.winnerCode === 1) {
            this.winner = 'homeTeam';
        } else if (sofascoreResult.event.winnerCode === 2) {
            this.winner = 'awayTeam';
        }
        // incidents
        sofascoreResult.incidents.forEach((incident) => {
            let team = null;
            if (incident.playerTeam === 1) {
                team = 'homeTeam';
            } else if (incident.playerTeam === 2) {
                team = 'awayTeam';
            }
            let incidentObj = {
                incidentType: incident.incidentType,
                incidentClass: incident.incidentClass,
                time: incident.time,
                team: team,
            };
            this.incidents.push(incidentObj);
        });
        return this;
    }
};