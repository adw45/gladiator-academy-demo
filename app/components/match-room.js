const matchRoom = Vue.component('match-room', {
    template: `
        <div>
            <h1>Room: {{ roomName }}</h1>
            <div id="game-type">Game Type: {{ type }}</div>
            <div id="bestOf">Best of: {{ bestOf }}</div>
            <team team="red"></team>
            <map-select></map-select>
            <scoreboard></scoreboard>
            <team team="blue"></team>
        </div>
    `,
    methods: {
        joinRoom: function() {
            this.$socket.emit('join-room', {
                roomname: this.$route.params.id
            })
        }
    },
    computed: {
        roomName() {
            return this.$route.params.id
        },
        type(){
            return this.$store.state.type;
        },
        bestOf(){
            return this.$store.state.bestOf;
        },
        count() {
            return this.$store.state.count;
        }
    },
    mounted() {
        this.joinRoom();
    },
    watch: {
        '$route' (to, from) {
            this.joinRoom();
        }
    }
});

module.exports = matchRoom;
