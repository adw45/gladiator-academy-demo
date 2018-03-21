import axios from 'axios';
import _ from 'lodash';

export default {
    props: ['title'],
    computed: {
        created: function() {
            return this.$route.query.accountCreated
        },
        isLoggedIn: function() {
            return !_.isNil(this.$cookie.get('ga-jwt'));
        }
    },
    methods: {
        joinRoom: function() {
            this.$router.push({name: 'room', params: {id: jQuery("#roomName").val()}})
        },
        login: function() {
            this.$router.push({name: 'login'});
        },
        logout: function() {
            this.$cookie.delete('ga-jwt');
            this.$router.go();
        },
        signup: function() {
            this.$router.push({name: 'signup'});
        },
        checkAuthentication: async function() {
            let response = await axios.get('/bnet/auth/isAutheticated');
            console.log(response);
        },
        secret: async function() {
            try {
                let response = await axios.get('/secret', {
                    headers: {
                        Authorization: 'JWT ' + this.$cookie.get('ga-jwt')
                    }
                });
                console.log(response);
            }
            catch(err) {
                console.log('not logged in');
            }

        }
    }
}
