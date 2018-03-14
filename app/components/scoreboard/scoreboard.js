import _ from 'lodash';

export default {
    methods: {
        winner(reportedWinner) {
            this.$socket.emit('phase-winner', {
                reportedWinner
            });
        },
    },
    computed: {
        winningTeam() {
            return this.$store.state.phase.winningTeam;
        },
        losingTeam() {
            return this.$store.state.phase.losingTeam;
        },
        redScore() {
            return this.$store.state.scoreboard.redScore;
        },
        blueScore() {
            return this.$store.state.scoreboard.blueScore;
        },
        phase() {
            return this.$store.state.phase;
        },
        isLeader() {
            if (this.$store.state.team[this.team].leader){
                var thisPlayer = this.$store.state.team[this.team].leader.id === this.$store.state.id ;
                return thisPlayer;
            }
        },
        isArenaPhase() {
            return _.includes(['round-one'], this.$store.state.phase.type);
        },
    }
}
