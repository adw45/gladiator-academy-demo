const mapSelect = {
    state: {
        maps: []
    },
    mutations: {
        update: (state, data) => {
            state.maps = data.maps;
        }
    }
}

module.exports = mapSelect;
