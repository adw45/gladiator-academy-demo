import axios from 'axios';

export default {
    data: function() {
        return {
            accountName: null,
            password: null
        }
    },
    methods: {
        login: async function(){
            let data = {
                accountName: this.accountName,
                password: this.password
            };
            try {
                let response = await axios.post('/login', data);
                this.$cookie.set('ga-jwt', response.data.token);
                this.$router.push({name: 'home'});
            }
            catch(err) {

            }
        }
    }
}