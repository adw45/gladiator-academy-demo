<template>
    <div class='team-block'>

        <div v-if='isFormTeam && !isReady'>
            <button v-if='!onTeam && !isFull' @click='joinTeam()'>Join {{team}} Team</button>
            <button v-if='onTeam' @click='leaveTeam()'>Leave {{team}} Team</button>
        </div>

        <div v-if='onTeam && isLeader && isFormTeam && teamIsSize(3)'>
            <button v-if='!isReady' @click='ready()'>Ready</button>
            <button v-if='isReady' @click='unready()'>Unready</button>
        </div>

        <div v-if='isCompValid && isCompSelect'>
            <button v-if='!isReady && isLeader' @click='ready()'>Lock Composition</button>
            <span v-if='isReady'>Composition Locked In</span>
        </div>

        <player :team='team' :position='0'></player>
        <player :team='team' :position='1'></player>
        <player :team='team' :position='2'></player>
        <player :team='team' :position='3'></player>
    </div>
</template>

<script src='./team.js'></script>
<style src='./team.css'></style>
