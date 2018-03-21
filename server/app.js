let redisService = require('redis'),
    passport = require('passport'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    express = require('express'),
    fs = require('fs'),
    path = require('path'),
    mongoose = require('mongoose'),
    redis = require('./data/redis')(redisService),
    matchService = require('./services/match.service')(redis),
    playerService = require('./services/player.service')(redis),
    teamService = require('./services/team.service')(redis),
    phaseService = require('./services/phase.service')(redis),
    services = { matchService, playerService, teamService, phaseService },
    config = require('./config'),
    io = require('./socket'),
    routes = require('./routes'),
    app = express(),
    bodyParser = require('body-parser'),
    server;

if (process.env.NODE_ENV !== 'production') {
    let https = require('https');

    server = https.createServer({
        key: fs.readFileSync('./key.pem'),
        cert: fs.readFileSync('./cert.pem')
    }, app);
}
else {
    let http = require('http');
    server = http.Server(app);
}

io(server, services);

mongoose.connect(config.mongo.url);
mongoose.connection.on('error', function(err) {
    console.log('Error: Could not connect to MongoDB.');
});

app.use(cookieParser());
app.use(session({
    secret: 'blizzard',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('./app'));
app.use('/', routes);

app.use('/scripts', express.static(__dirname + '/node_modules/vue*/dist/'));
app.use('/scripts', express.static(__dirname + '/node_modules/axios/dist/'));

let port = process.env.PORT || 3000;

exports.server = server.listen(port, () => {
    console.log('Example app listening on port', port)
});
