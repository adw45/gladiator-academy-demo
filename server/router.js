const express = require('express'),
    playerRouter = require('./routes/player'),
    router = express.Router();

router.use('/player', playerRouter);

router.get('/', (req, res) => {
    res.status(200).send("API is accessible");
});

module.exports = router;
