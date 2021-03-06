import _ from 'lodash';

export default {
    props: {
        team: {
            type: String,
            required: true
        },
        position: {
            type: Number,
            required: true
        },
        nickname: String,
        blizzardId: String,
        characterName: String,
        classSpec: String
    },
    methods: {
        updateNickname(nickname) {
            this.$socket.emit('player-nickname', {
                team: this.team,
                positon: this.position,
                nickname: nickname
            });
        },
        updateBlizzardId(blizzardId) {
            this.$socket.emit('player-blizzardId', {
                team: this.team,
                positon: this.position,
                blizzardId: blizzardId
            });
        },
        updateCharacterName(characterName) {
            this.$socket.emit('player-characterName', {
                team: this.team,
                positon: this.position,
                characterName: characterName
            });
        },
        updateLeader(playerId) {
            this.$socket.emit('player-leader', {
                team: this.team,
                positon: this.position,
                playerId: playerId
            });
        },
        updateClassSpec(classSpec){
            this.$socket.emit('player-classSpec', {
                team: this.team,
                positon: this.position,
                classSpec: classSpec
            });
        },
        submit() {
            console.log(this);
            return
       }
    },
    computed: {
        exists() {
            if (this.$store.state.playerSelect.teams[this.team] !== undefined &&
                this.$store.state.playerSelect.teams[this.team]["players"][this.position] !== undefined) {
                return true;
            }
            else return false;
        },
        player() {
            return this.$store.state.playerSelect.teams[this.team]["players"][this.position];
        },
        editable() {
            return this.$store.state.id ===
                this.$store.state.playerSelect.teams[this.team]["players"][this.position]["id"];
        },
        isLeader() {
            var thisPlayer = _.find(this.$store.state.playerSelect.teams.red.players, { id: this.$store.state.id });
            if (!thisPlayer) {
                thisPlayer = _.find(this.$store.state.playerSelect.teams.blue.players, { id: this.$store.state.id });
            }
            return thisPlayer && thisPlayer.leader;
        },
        sameTeam() {
            if (this.team ===  'red'
                 && _.find(this.$store.state.playerSelect.teams.red.players, { id: this.$store.state.id })
            ){
                return true;
            }
            if (this.team == 'blue'
                &&_.find(this.$store.state.playerSelect.teams.blue.players, { id: this.$store.state.id })
            ){
                return true;
            }
            return false
        },
        isSelectPhase() {
            var phase = this.$store.state.phase
            return phase.type === 'blind-pick'
                ||  phase.type === 'team-pick' && phase.team === this.team;
        }
    }
};
