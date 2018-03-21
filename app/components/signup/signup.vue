<template>
    <div>
        <h1>Create Account</h1>
        <span>This will be error messages:</span>
        <div>
            <span>Account Name</span>
            <input type="text" v-model="accountName"></input>
        </div>
        <div>
            <span>Email Address</span>
            <input type="text" v-model="email"></input>
        </div>
        <div>
            <span>Blizzard ID</span>
            <input type="text" v-model="blizzardId"></input>
        </div>
        <div>
            <span>Password</span>
            <input type="password" v-model="password"></input>
        </div>
        <div>
            <span>Repeat Password</span>
            <input type="password" v-model="repeatPassword"></input>
        </div>
        <button @click="submit()">Submit</button>
    </div>
</template>

<script src='./signup.js'></script>
