import scoreboard from './modules/scoreboard.js';
import mapSelect from './modules/map-select.js'

// https://www.youtube.com/watch?v=2CSr2vBApSI&index=1&list=PL55RiY5tL51pT0DNJraU93FhMzhXxtDAo
const store = new Vuex.Store({
    state: {
        type: null,
        bestOf: null
    },
    mutations: {
        update: (state, data) => {
            state.type = data.type;
            state.bestOf = data.bestOf;
        }
    },
    modules: {
         scoreboard,
         mapSelect
    }
});

module.exports = store;
