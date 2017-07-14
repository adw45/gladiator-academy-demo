<template>
    <div class='team-block'>
        <button v-if='!onTeam && isFormTeam && !isReady && !isFull' @click='joinTeam()'>Join {{team}} Team</button>
        <button v-if='onTeam && isFormTeam && !isReady' @click='leaveTeam()'>Leave {{team}} Team</button>
        <button v-if='isLeader && isFormTeam && !isReady && teamIsSize(3)' @click='ready()'>Ready</button>
        <button v-if='isLeader && isFormTeam && isReady && teamIsSize(3)' @click='unready()'>Unready</button>
        <player :team='team' :position='0'></player>
        <player :team='team' :position='1'></player>
        <player :team='team' :position='2'></player>
        <player :team='team' :position='3'></player>
    </div>
</template>

<script src='./team.js'></script>
<style src='./team.css'></style>
