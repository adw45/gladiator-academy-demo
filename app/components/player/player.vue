<template>
    <div class='player-block'>
        <div v-if="exists && editable">
            <div>
                <span v-if="player.leader" class="glyphicon glyphicon-star"></span>
                <input type='text'  placeholder='Nickname'
                    :value='player.nickname'
                    v-bind:nickname='nickname'
                    v-on:blur='updateNickname($event.target.value)'></input>
                <input type='text' placeholder='Blizzard Id'
                    :value='player.blizzardId'
                    v-bind:blizzardId='blizzardId'
                    v-on:blur='updateBlizzardId($event.target.value)'></input>
            </div>
            <div>
                <select
                    :value='player.classSpec'
                    :disabled='!isSelectPhase'
                    v-bind:classSpec='classSpec'
                    v-on:change='updateClassSpec($event.target.value)'>
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
                <input type='text'  placeholder='Character Name'
                    :value='player.characterName'
                    :disabled='!isSelectPhase'
                    v-bind:characterName='characterName'
                    v-on:blur='updateCharacterName($event.target.value)'></input>
                <button v-if='isSelectPhase' @click="submit()">Lock In</button>
            </div>
        </div>
        <div v-else-if="exists && !editable">
            <span v-if="player.leader" class="glyphicon glyphicon-star"></span>
            <button v-if="isLeader && sameTeam"
                @click="updateLeader(player.id)">Make Leader</button>
            {{ player.nickname }}
            {{ player.blizzardId }}
            {{ player.classSpec }}
            {{ player.characterName }}
        </div>
        <div v-else class='empty'>
            empty
        </div>
    </div>
</template>

<script src='./player.js'></script>
<style src='./player.css'></style>
