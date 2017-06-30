const team = Vue.component('team', {
    props: {
        team: {
            type: String,
            required: true
        }
    },
    template: `
        <div>
            <button @click='joinTeam()'>Join {{team}} Team</button>
            <player-select :team='team' :position='0'></player-select>
            <player-select :team='team' :position='1'></player-select>
            <player-select :team='team' :position='2'></player-select>
            <player-select :team='team' :position='3'></player-select>
        </div>
    `,
    methods: {
        joinTeam: function() {
            this.$socket.emit('joinTeam', {
                team: this.team, 
            })
        }
    },
    computed: {
    }
});

module.exports = team;
