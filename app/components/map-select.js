// http://jsfiddle.net/La8wQ/10/
const mapSelect = Vue.component('map-select', {
    template: `
        <div>
            <template v-for='map in maps'>
                <input type='radio' name='map'>
                    <img v-bind:src='map.imageUrl' width='100' heigh='70'>
                    {{ map.name }}
                </input>
            </template>
            
        </div>
    `,
    methods: {
       
    },
    computed: {
        maps() {
            return this.$store.state.mapSelect.maps;
        }
    }
});

module.exports = mapSelect;
