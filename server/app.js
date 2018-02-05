let redisService = require('redis'),
    redis = require('./data/redis')(redisService),
    matchService = require('./services/match.service')(redis),
    playerService = require('./services/player.service')(redis),
    teamService = require('./services/team.service')(redis),
    phaseService = require('./services/phase.service')(redis)
    services = { matchService, playerService, teamService, phaseService },
    express= require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('./socket'),
    routes = require('./router');

io(server, services);

app.use(express.static('./app'));
app.use('/_api', routes);

let port = process.env.PORT || 3000;

exports.server = server.listen(port, () => {
  console.log('Example app listening on port', port)
});
