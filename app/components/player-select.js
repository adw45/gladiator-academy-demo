const playerSelect = Vue.component('player-select', {
    props: {
        team: {
            type: String,
            required: true
        },
        position: {
            type: Number,
            required: true
        },
        blizzId: String,
        charName: String,
        nickname: String,
        character: String
    },
    template: `
        <div>
            <div v-if="exists && editable">
                {{ player.id }}
                <input type='text' placeholder='Nickname'\
                    v-bind:nickname='nickname'\
                    v-on:blur='updateNickname($event.target.value)'></input>
                <select v-model='character'>
                    <option selected='true' disabled>Class/Spec</option>
                    <optgroup label="Death Knight">
                        <option>Blood</option>
                        <option>Frost</option>
                        <option>Unholy</option>
                    </optgroup>
                    <optgroup label="Demon Hunter">
                        <option>Havoc</option>
                        <option>Vengence</option>
                    </optgroup>
                    <optgroup label="Hunter">
                        <option>Beast Master</option>
                        <option>Marksmanship</option>
                        <option>Survival</option>
                    </optgroup>
                    <optgroup label="Mage">
                        <option>Arcane</option>
                        <option>Fire</option>
                        <option>Frost</option>
                    </optgroup>
                    <optgroup label="Druid">
                        <option>Balance</option>
                        <option>Feral</option>
                        <option>Guardian</option>
                        <option>Restoration</option>
                    </optgroup>
                    <optgroup label="Paladin">
                        <option>Holy</option>
                        <option>Retribution</option>
                        <option>Protection</option>
                    </optgroup>
                    <optgroup label="Priest">
                        <option>Holy</option>
                        <option>Discipline</option>
                        <option>Shadow</option>
                    </optgroup>
                    <optgroup label="Rogue">
                        <option>Subtlety</option>
                        <option>Assassination</option>
                        <option>Outlaw</option>
                    </optgroup>
                    <optgroup label="Shaman">
                        <option>Restoration</option>
                        <option>Elemental</option>
                        <option>Enhancement</option>
                    </optgroup>
                    <optgroup label="Warlock">
                        <option>Destruction</option>
                        <option>Affliction</option>
                        <option>Demonology</option>
                    </optgroup>
                    <optgroup label="Warrior">
                        <option>Arms</option>
                        <option>Protection</option>
                        <option>Fury</option>
                    </optgroup>
                    <optgroup label="Monk">
                        <option>Mistweaver</option>
                        <option>Brewmaster</option>
                        <option>Windwalker</option>
                    </optgroup>
                </select>
                <input type='text' placeholder='Blizzard Id'\
                    v-bind:blizzId='blizzId'\
                    v-on:blur='updateBlizzId($event.target.value)'></input>
                <input type='text' placeholder='Character Name'\
                    v-bind:charName='charName'\
                    v-on:blur='updateCharName($event.target.value)'></input>

                <button @click="submit()">Submit</button>
            </div>
            <div v-else-if="exists && !editable">
                {{ player.id }}
                {{ player.nickname }}
                {{ player.blizzId }}
                {{ player.charName }}
            </div> 
            <div v-else>
                empty
            </div> 
        </div>
    `,
    methods: {
        updateNickname(nickname) {
            this.$socket.emit('set-nickname', { 
                team: this.team, 
                positon: this.position, 
                nickname: nickname });
        },
        updateBlizzId(blizzId) {
            this.$socket.emit('set-blizzId', { 
                team: this.team, 
                positon: this.position, 
                blizzId: blizzId });
        },
        updateCharName(charName) {
            this.$socket.emit('set-charName', { 
                team: this.team, 
                positon: this.position, 
                charName: charName });
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
            return this.$store.state.playerSelect.id === 
                this.$store.state.playerSelect.teams[this.team]["players"][this.position]["id"];
        }
    }
});

module.exports = playerSelect;
