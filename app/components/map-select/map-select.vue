// http://jsfiddle.net/La8wQ/10/

<template>
    <div>
        <template v-for='map in maps'>
            <input type='radio' name='map'>
                <img v-bind:src='map.imageUrl' width='100' heigh='70'>
                {{ map.name }}
            </input>
        </template>
    </div>
</template>

<script src='./map-select.js'></script> 
