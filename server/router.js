const express = require('express'),
    playerRouter = require('./routes/player'),
    router = express.Router();

router.use('/player', playerRouter);

router.get('/', (req, res) => {
    res.status(200).send("API is accessible");
});

// Account List
// https://us.api.battle.net/wow/user/characters?access_token=c6cafw6pz2mhuvtsa9qhthgc


module.exports = router;
