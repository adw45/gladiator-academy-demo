var express = require('express'),
    server = require('http'),
    io = require('./socket/socket.js'),
    routes = require('./router.js')
    _ = require('lodash'),
    app = express(),
    server = server.Server(app);
    
io(server);

app.use(express.static('./app'));
app.use('/_api', routes);

var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Example app listening on port', port)
});
