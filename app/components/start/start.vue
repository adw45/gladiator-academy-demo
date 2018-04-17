<template>
    <div>
        <div class='header'>
            <div v-if="!isLoggedIn">
                <a @click="login()">Login</a> |
                <a @click="signup()">Create Account</a>
            </div>
            <div v-if="isLoggedIn">
                <a @click="profile()">Profile</a> |
                <a @click="logout()">Logout</a>
            </div>

            <div v-if="created">
                <p>Account Created</p>
            </div>
        </div>

        <div class='create-game'>
            <h1>{{ title }}</h1>
            <input type="text" id="roomName" placeholder="Room name" />
            <button @click="joinRoom()">Join Room</button>
        </div>

        <div class='open-games'>
            <h2>Open Games</h2>
        </div>
    </div>
</template>

<script src='./start.js'></script>
<style src='./start.css'></style>
