<template>
    <div>
        <h1>Login</h1>
        <span>This will be error messages:</span>
        <div>
            <span>Account Name</span>
            <input type="text" v-model="accountName"></input>
        </div>
        <div>
            <span>Password</span>
            <input type="password" v-model="password"></input>
        </div>
        <button @click="login()">Login</button>
    </div>
</template>

<script src='./login.js'></script>
