export default {
    props: {
        team: {
            type: String,
            required: true
        }
    },
    methods: {
        joinTeam: function() {
            this.$socket.emit('join-team', {
                team: this.team, 
            })
        }
    },
    computed: {
    }
}
