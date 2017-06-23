import VueSocketio from './js/vendor/vue-socket.min.js';
import store from './store/store.js';
import router from './router.js';

Vue.use(VueSocketio, window.location.host, store);

var app = new Vue({
    router, 
    store,
    el: '#app',
    data: {
    },
    sockets: {
        update: function(data) {
            store.commit('update', data)
        }
    }
});
