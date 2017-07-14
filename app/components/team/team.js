export default {
    props: {
        team: {
            type: String,
            required: true
        }
    },
    methods: {
        joinTeam() {
            this.$socket.emit('team-join', {
                team: this.team 
            });
        },
        leaveTeam() {
            this.$socket.emit('team-leave', {
                team: this.team
            });
        },
        ready() {
            this.$socket.emit('team-ready', {
                team: this.team
            });
        },
        unready() {
            this.$socket.emit('team-unready', {
                team: this.team
            });
        },
        teamIsSize(size) {
            return size <= this.$store.state.team[this.team].size;
        }
    },
    computed: {
        isLeader() {
            if (this.$store.state.team[this.team].leader){
                var thisPlayer = this.$store.state.team[this.team].leader.id === this.$store.state.id ;
                return thisPlayer;
            }
        },
        isFormTeam() {
            return this.$store.state.phase.type === 'form-team'
        },
        isReady() {
            return this.$store.state.phase.ready[this.team];
        },
        onTeam() {
            return _.find(this.$store.state.team[this.team].players, {id: this.$store.state.id});
        },
        isFull() {
            return this.$store.state.team[this.team].players.length >= 4;
        }
    }
};
