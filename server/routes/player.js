var playerRouter = require('express').Router();
var io = require("../app.js");

var numbers = {};

playerRouter.get('/getNum/:sessionId', function(req, res) {
    res.status(200).send({
        num: numbers[req.params.sessionId]
    });
});

playerRouter.get('/newSession', function(req, res) {
    var id = Math.floor(Math.random() * (1000 - 0));
    numbers[id] = 5;
    io.of(id);
    res.status(200).send({
        sessionId: id,
        num: numbers[id]
    });
});

playerRouter.post('/increase/:sessionId', function(req, res) {
    numbers[req.params.sessionId]++;
    io.of(req.params.sessionId).emit('numUpdate', numbers[req.params.sessionId]);
    res.status(200).send();

});

playerRouter.post('/decrease/:sessionId', function(req, res) {
    numbers[req.params.sessionId]--;
    io.of(req.params.sessionId).emit('numUpdate', numbers[req.params.sessionId]);
    res.status(200).send();

});

playerRouter.get('/', function(req, res) {
    res.status(200).send({test: "123"});
});



module.exports = playerRouter;