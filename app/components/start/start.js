import axios from 'axios';

export default {
    props: ['title'],
    methods: {
        joinRoom: function() {
            this.$router.push( {name: 'room', params: { id: jQuery("#roomName").val() } } )
        },
        isAuthenticated: async () => {
            let response = await axios.get('/authenticated')
            return response.data;
        },
        checkAuthentication: async () => {
            let response = await axios.get('/authenticated')
            console.log(response);
        }
    }
}
