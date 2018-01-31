let redisService = require('redis'),
    redis = require('./data/redis')(redisService),
    matchController = require('./controllers/match-controller')(redis),
    playerController = require('./controllers/player-controller')(redis),
    teamController = require('./controllers/team-controller')(redis),
    express= require('express'),
    app = express(),
    server = require('http').Server(app);
    io = require('./socket'),
    routes = require('./router')
    _ = require('lodash');

io(server, matchController, playerController, teamController);

app.use(express.static('./app'));
app.use('/_api', routes);

let port = process.env.PORT || 3000;

exports.server = server.listen(port, () => {
  console.log('Example app listening on port', port)
});
