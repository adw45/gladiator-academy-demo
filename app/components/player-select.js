const playerSelect = Vue.component('player-select', {
    template: `
        <div>
            <input type='text' placeholder='Nickname'></input>
            <select>
                <option selected='true' disabled>Class</option>
                <option>Death Knight</option>
                <option>Demon Hunter</option>
                <option>Hunter</option>
                <option>Mage</option>
                <option>Monk</option>
                <option>Druid</option>
                <option>Paladin</option>
                <option>Priest</option>
                <option>Rogue</option>
                <option>Shaman</option>
                <option>Warlock</option>
                <option>Warrior</option>
            </select>
            <select>
                <option selected='true' disabled>Specialization</option>
                <option>Discipline</option>
                <option>Holy</option>
                <option>Shadow</option>
            </select>
            <input type='text' placeholder='Blizzard Id'></input>
            <input type='text' placeholder='Character Name'></input>
            <button>Lock</button>
        </div>
    `,
    methods: {
       
    },
    computed: {
        count() {
            return this.$store.state.count;
        },
        roomName: function() {
            return this.$route.params.id
        } 
    }
});

module.exports = playerSelect;
