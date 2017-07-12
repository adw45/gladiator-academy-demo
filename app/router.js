var start = require('./components/start/start.vue'),
    match = require('./components/match/match.vue');

Vue.component('start', start);
Vue.component('match', match);
Vue.component('map-select', require('./components/map-select/map-select.vue'));
Vue.component('player-select', require('./components/player-select/player-select.vue'));
Vue.component('scoreboard', require('./components/scoreboard/scoreboard.vue'))
Vue.component('team', require('./components/team/team.vue'));
//Vue.component('chat', require('./components/chat/chat.vue'));

const router = new VueRouter({
    routes:[
        { path: '/', component: start, props: { title: "Gladiator Academy" } } ,
        { name: 'room', path: '/room/:id', component: match }
    ]
});

module.exports = router;
