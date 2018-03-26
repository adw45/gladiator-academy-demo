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
        profile: function() {
            this.$router.push({name: 'profile'});
        }
    }
}
