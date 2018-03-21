import axios from 'axios';
import _ from 'lodash';

export default {
    data: function() {
        return {
            accountName: null,
            email: null,
            blizzardId: null,
            password: null,
            repeatPassword: null
        }
    },
    methods: {
        submit: async function(){
            let data = {
                accountName: this.accountName,
                email: this.email,
                blizzardId: this.blizzardId,
                password: this.password
            };
            try {
                await axios.post('/signup', data);
                this.$router.push({name: 'home', query: {accountCreated: true}});
            }
            catch(err) {
            }
        }
    },
    computed: {

    }
}