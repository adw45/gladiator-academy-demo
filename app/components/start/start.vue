<template>
    <div>
        <a href="/auth/bnet">Login with Bnet</a>
        <a href="/logout">Log Out of Bnet</a>

        <h1>{{ title }}</h1>
        <input type="text" id="roomName" placeholder="Room name" />
        <button @click="joinRoom()">Join Room</button>
        <button @click="checkAuthentication()">checkAuthentication</button>
    </div>
</template>

<script src='./start.js'></script>
