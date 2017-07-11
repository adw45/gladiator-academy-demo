<template>
    <div>
        <div v-if="exists && editable">
            {{ player.id }}
            <span v-if="player.leader">
                L 
            </span>
            <input type='text'  placeholder='Nickname' 
                :value='player.nickname'
                v-bind:nickname='nickname' 
                v-on:blur='updateNickname($event.target.value)'></input>
            <select 
                :value='player.spec' 
                v-bind:spec='spec' 
                v-on:change='updateSpec($event.target.value)'>
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
            <input type='text' placeholder='Blizzard Id'
                :value='player.blizzId' 
                v-bind:blizzId='blizzId'
                v-on:blur='updateBlizzId($event.target.value)'></input>
            <input type='text'  placeholder='Character Name'
                :value='player.charName'
                v-bind:charName='charName'
                v-on:blur='updateCharName($event.target.value)'></input>
            <button @click="submit()">Submit</button>
        </div>
        <div v-else-if="exists && !editable">
            {{ player.id }}
            <span v-if="player.leader">L</span> 
            <button v-if="isLeader && sameTeam" 
                @click="updateLeader(player.id)">Make Leader</button>
            {{ player.nickname }}
            {{ player.spec }}
            {{ player.blizzId }}
            {{ player.charName }}
        </div> 
        <div v-else>
            empty
        </div> 
    </div>
</template>

<script src='./player-select.js'></script>
