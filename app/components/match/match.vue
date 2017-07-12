<template>
    <div>
        <h1>Room: {{ roomName }}</h1>
        <div id="game-type">Game Type: {{ type }}</div>
        <div id="bestOf">Best of: {{ bestOf }}</div>
        <team team="red"></team>
        <div class='middle-block'>
            <scoreboard></scoreboard>
            <map-select></map-select>
            <!--chat></chat -->
        </div>
        <team team="blue"></team>
    </div>
</template>

<script src='./match.js'></script>
<style src='./match.css'></style>