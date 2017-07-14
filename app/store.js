import team from './components/team/team.store';
import playerSelect from './components/player/player.store';
import scoreboard from './components/scoreboard/scoreboard.store';
import mapSelect from './components/map-select/map-select.store';

const store = new Vuex.Store({
    state: {
        type: null,
        bestOf: null,
        id: null,
        phase: {}
    },
    mutations: {
        update: (state, data) => {
            state.type = data.type;
            state.bestOf = data.bestOf;
            state.phase = data.phase;
        },
        connected: (state, data) => {
            state.id = data.id
        }
    },
    modules: {
         team,
         playerSelect,
         scoreboard,
         mapSelect
    }
});

module.exports = store;
