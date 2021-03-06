import Vue from 'vue';
import VueSocketio from 'vue-socket.io';
import VueCookie from 'vue-cookie';
import store from './store.js';
import router from './router.js';

Vue.use(VueSocketio, window.location.host, store);
Vue.use(VueCookie);

var app = new Vue({
    router,
    store,
    el: '#app',
    sockets: {
        update: function(data) {
            store.commit('update', data)
        },
        connected: function(data) {
            store.commit('connected', data)
        }
    }
});