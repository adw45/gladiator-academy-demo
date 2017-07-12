<template>
    <div class="map-selector map-block">
        <template v-for='map in maps'>
            <input v-if='!map.winner' type='radio' name='map' :id='map.name' :class='map.name' :value='map.name'>
            <label class='drinkcard-map' :class='[map.name, map.winner]' :for='map.name'></label>
        </template>
    </div>
</template>

<script src='./map-select.js'></script> 
<style src='./map-select.css'></style>
