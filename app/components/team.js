const team = Vue.component('team', {
    template: `
        <div>
            <player-select></player-select>
            <player-select></player-select>
            <player-select></player-select>
            <player-select></player-select>
        </div>
    `,
    methods: {
       
    },
    computed: {
    }
});

module.exports = team;
