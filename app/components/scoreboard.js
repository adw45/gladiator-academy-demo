const scoreboard = Vue.component('scoreboard', {
    template: `
        <div>
            <div id="red-score">
                <span>Team1</span>
                <span>{{ redScore }}</span>
            </div>
            
            <div id="timer">
                <span>Timer</span>
            </div>

            <div id="blue-score">
                <span>Team2</span>
                <span>{{ blueScore }}</span>
            </div>
        </div>
    `,
    methods: {

    },
    computed: {
        redScore() {
            return this.$store.state.scoreboard.redScore;
        },
        blueScore() {
            return this.$store.state.scoreboard.blueScore;
        }
    }
});

module.exports = scoreboard;
