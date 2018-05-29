<template>
    <div class='scoreboard-block'>
        <div class="red-score score">
            <span>{{ redScore }}</span>
            <button v-if='isArenaPhase' @click='winner("red")'>Red Wins</button>
        </div>
        <div class="blue-score score">
            <button v-if='isArenaPhase' @click='winner("blue")'>Blue Wins</button>
            <span>{{ blueScore }}</span>
        </div>
        <div v-if='phase.type === "form-team"'>
            Waiting for teams to form
        </div>
        <div v-if='phase.type === "blind-pick"'>
            Blind Pick
        </div>
        <div v-if='phase.type === "round-one"'>
            Round One, Fight!
        </div>
        <div v-if='phase.type === "game-over"'>
            {{winningTeam}} Team Wins!
        </div>
        <!--div v-if='phase.type === "map-pick-one"'>
            {{winningTeam}} Team Wins! {{losingTeam}} Team's Map Pick
        </div-->
    </div>
</template>

<script src='./scoreboard.js'></script>
<style src='./scoreboard.css'></style>
