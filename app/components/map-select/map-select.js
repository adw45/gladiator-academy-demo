export default {
    name: 'map-select',
    methods: {
        isSelectedMap(map) {
            return _.find(this.$store.state.mapSelect.maps, {name: map.name}).selected;
        },
        
    },
    computed: {
        maps() {
            return this.$store.state.mapSelect.maps;
        },
        isMapSelectPhase() {
            return this.$store.state.phase.type === 'map-select';
        }
    }
}
