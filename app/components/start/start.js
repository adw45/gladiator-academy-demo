export default {
    props: ['title'],
    methods: {
        joinRoom: function() {
            this.$router.push( {name: 'room', params: { id: jQuery("#roomName").val() } } )
        }
    }
}
