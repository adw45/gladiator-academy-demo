export default {
    methods: {

    },
    computed: {
        redScore() {
            return this.$store.state.scoreboard.redScore;
        },
        blueScore() {
            return this.$store.state.scoreboard.blueScore;
        },
        phase() {
            return this.$store.state.phase;
        }
    }
}
