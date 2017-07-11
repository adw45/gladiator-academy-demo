export default {
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
}
