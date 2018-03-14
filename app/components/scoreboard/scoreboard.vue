<template>
    <div class='scoreboard-block'>
        <div class="red-score score">
            <span>{{ redScore }}</span>
        </div>
        <div class="blue-score score">
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
    </div>
</template>

<script src='./scoreboard.js'></script>
<style src='./scoreboard.css'></style>
