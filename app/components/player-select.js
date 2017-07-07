import _ from 'lodash';

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
        nickname: String,
        blizzId: String,
        charName: String,
        spec: String
    },
    template: `
        <div>
            <div v-if="exists && editable">
                {{ player.id }}
                <span v-if="player.leader">
                    L 
                </span>
                <input type='text' :value='player.nickname' placeholder='Nickname' \
                    v-bind:nickname='nickname'\
                    v-on:blur='updateNickname($event.target.value)'></input>
                <select :value='player.spec' v-bind:spec='spec' v-on:change='updateSpec($event.target.value)'>
                    <optgroup label="Death Knight">
                        <option value='dk-blood'>Blood</option>
                        <option value='dk-frost'>Frost</option>
                        <option value='dk-unholy'>Unholy</option>
                    </optgroup>
                    <optgroup label="Demon Hunter">
                        <option value='dh-havoc'>Havoc</option>
                        <option value='dh-vengence'>Vengence</option>
                    </optgroup>
                    <optgroup label="Hunter">
                        <option value='hunter-beastmaster'>Beast Master</option>
                        <option value='hunter-marksmanship'>Marksmanship</option>
                        <option value='hunter-survival'>Survival</option>
                    </optgroup>
                    <optgroup label="Mage">
                        <option value='mage-arcane'>Arcane</option>
                        <option value='mage-fire'>Fire</option>
                        <option value='mage-frost'>Frost</option>
                    </optgroup>
                    <optgroup label="Druid">
                        <option value='druid-balance'>Balance</option>
                        <option value='druid-feral'>Feral</option>
                        <option value='druid-guardian'>Guardian</option>
                        <option value='druid-restoration'>Restoration</option>
                    </optgroup>
                    <optgroup label="Paladin">
                        <option value='paladin-holy'>Holy</option>
                        <option value='paladin-retribution'>Retribution</option>
                        <option value='paladin-protection'>Protection</option>
                    </optgroup>
                    <optgroup label="Priest">
                        <option value='priest-holy'>Holy</option>
                        <option value='priest-discipline'>Discipline</option>
                        <option value='priest-shadow'>Shadow</option>
                    </optgroup>
                    <optgroup label="Rogue">
                        <option value='rogue-subtlety'>Subtlety</option>
                        <option value='rogue-assassination'>Assassination</option>
                        <option value='rogue-outlaw'>Outlaw</option>
                    </optgroup>
                    <optgroup label="Shaman">
                        <option value='shaman-restoration'>Restoration</option>
                        <option value='shaman-elemental'>Elemental</option>
                        <option value='shaman-enhancement'>Enhancement</option>
                    </optgroup>
                    <optgroup label="Warlock">
                        <option value='warlock-destruction'>Destruction</option>
                        <option value='warlock-afflication'>Affliction</option>
                        <option value='warlock-demonology'>Demonology</option>
                    </optgroup>
                    <optgroup label="Warrior">
                        <option value='warrior-arms'>Arms</option>
                        <option value='warrior-protection'>Protection</option>
                        <option value='warrior-fury'>Fury</option>
                    </optgroup>
                    <optgroup label="Monk">
                        <option value='monk-mistweaver'>Mistweaver</option>
                        <option value='monk-brewmaster'>Brewmaster</option>
                        <option value='monk-windwalker'>Windwalker</option>
                    </optgroup>
                </select>
                <input type='text' :value='player.blizzId' placeholder='Blizzard Id'\
                    v-bind:blizzId='blizzId'\
                    v-on:blur='updateBlizzId($event.target.value)'></input>
                <input type='text' :value='player.charName' placeholder='Character Name'\
                    v-bind:charName='charName'\
                    v-on:blur='updateCharName($event.target.value)'></input>
                <button @click="submit()">Submit</button>
            </div>
            <div v-else-if="exists && !editable">
                {{ player.id }}
                <span v-if="player.leader">
                    L 
                </span> 
                <button v-if="isLeader && sameTeam" @click="updateLeader(player.id)">Make Leader</button>
                {{ player.nickname }}
                {{ player.spec }}
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
                nickname: nickname 
            });
        },
        updateBlizzId(blizzId) {
            this.$socket.emit('set-blizzId', { 
                team: this.team, 
                positon: this.position, 
                blizzId: blizzId 
            });
        },
        updateCharName(charName) {
            this.$socket.emit('set-charName', { 
                team: this.team, 
                positon: this.position, 
                charName: charName 
            });
        },
        updateLeader(playerId) {
            this.$socket.emit('set-leader', { 
                team: this.team, 
                positon: this.position,
                playerId: id
            });
        },
        updateSpec(spec){
            this.$socket.emit('set-spec', { 
                team: this.team, 
                positon: this.position,
                spec: spec
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
            return this.$store.state.playerSelect.id === 
                this.$store.state.playerSelect.teams[this.team]["players"][this.position]["id"];
        },
        isLeader() {
            var thisPlayer = _.find(this.$store.state.playerSelect.teams.red.players, { id: this.$store.state.playerSelect.id });
            if (!thisPlayer) {
                thisPlayer = _.find(this.$store.state.playerSelect.teams.blue.players, { id: this.$store.state.playerSelect.id });
            }
            return thisPlayer && thisPlayer.leader;
        },
        sameTeam() {
            if (this.team ===  'red'
                 && _.find(this.$store.state.playerSelect.teams.red.players, { id: this.$store.state.playerSelect.id })
            ){
                return true;
            }
            if (this.team == 'blue'
                &&_.find(this.$store.state.playerSelect.teams.blue.players, { id: this.$store.state.playerSelect.id })
            ){
                return true;
            }
            return false
        }
    }
});

module.exports = playerSelect;
