<template>
    <div class='team-block'>
        <button v-if='!onTeam && isFormTeam && !isReady' @click='joinTeam()'>Join {{team}} Team</button>
        <button v-if='isLeader && isFormTeam && !isReady && teamIsSize(3)' @click='ready()'>Ready</button>
        <button v-if='isLeader && isFormTeam && isReady && teamIsSize(3)' @click='unready()'>Unready</button>
        <player-select :team='team' :position='0'></player-select>
        <player-select :team='team' :position='1'></player-select>
        <player-select :team='team' :position='2'></player-select>
        <player-select :team='team' :position='3'></player-select>
    </div>
</template>

<script src='./team.js'></script>
<style src='./team.css'></style>
