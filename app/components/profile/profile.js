import axios from 'axios';

export default {
    data: function() {
        return {
            accountName: null,
            email: null,
            blizzardId: null,
            characterList: null
        }
    },
    computed: {

    },
    methods: {
        home: function() {
            this.$router.push({name: 'home'});
        },
        getProfile: async function() {
            let response = await axios.get('/profile');
            console.log(response);
            return response;
        }
    },
    beforeMount: async function() {
        let response = await this.getProfile();

        this.accountName = response.data.accountName;
        this.email = response.data.email;
        this.blizzardId = response.data.blizzardId;
        this.characterList = response.data.characters;
    }
}
