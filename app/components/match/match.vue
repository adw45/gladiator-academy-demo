<template>
    <div>
        <h1>Room: {{ roomName }}</h1>
        <div id="game-type">Game Type: {{ type }}</div>
        <div id="bestOf">Best of: {{ bestOf }}</div>
        <team team="red"></team>
        <map-select></map-select>
        <scoreboard></scoreboard>
        <team team="blue"></team>
    </div>
</template>

<script src='./match.js'></script>
