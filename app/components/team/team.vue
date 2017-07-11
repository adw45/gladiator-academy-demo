<template>
    <div>
        <button @click='joinTeam()'>Join {{team}} Team</button>
        <player-select :team='team' :position='0'></player-select>
        <player-select :team='team' :position='1'></player-select>
        <player-select :team='team' :position='2'></player-select>
        <player-select :team='team' :position='3'></player-select>
    </div>
</template>

<script src='./team.js'></script>
