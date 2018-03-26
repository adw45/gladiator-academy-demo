<template>
    <div>
        <a @click="home()">Home</a>
        <h1>Profile</h1>

        <div>
            <div>
                <span>Account Name:</span>
                <span>{{ accountName }}</span>
            </div>
            <div>
                <span>Email:</span>
                <span>{{ email }}</span>
            </div>
            <div>
                <span>Blizzard Id:</span>
                <span>{{ blizzardId }}</span>
            </div>
            <div>
                <span>Characters:</span>
                <a href="/bnet/auth/authenticate"><button> Update Character List</button></a>
                <div v-for="character in characterList">
                    {{character.faction}}
                    {{character.name}}
                    {{character.class}}
                    {{character.race}}
                </div>
            </div>
        </div>

    </div>
</template>

<script src='./profile.js'></script>