let express = require('express'),
    blizzAuth = require('./routes/blizzard-auth'),
    playerRouter = require('./routes/player'),
    userRouter = require('./routes/users'),
    router = express.Router(),
    passport = require('passport'),
    passportJwt = require('passport-jwt'),
    BnetStrategy = require('passport-bnet').Strategy,
    config = require('./config'),
    _ = require('lodash'),
    axios = require('axios');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new BnetStrategy({
        clientID: config.bnet.id,
        clientSecret: config.bnet.secret,
        callbackURL: config.bnet.callbackUrl,
        region: 'us',
        scope: "wow.profile"
    }, async (accessToken, refreshToken, profile, callback) => {
        const response = await axios.get(`https://us.api.battle.net/wow/user/characters?access_token=${accessToken}`);
        userRouter.updateCharacterList(response.data.characters, profile.battletag);
        return callback(null, profile);
    })
);

// Blizzard OAuth routes
router.get('/bnet/auth/isAutheticated', blizzAuth.isAuthenticated);
router.get('/bnet/auth/logout', blizzAuth.logout);

router.get('/bnet/auth/authenticate',
    passport.authenticate('jwt'),
    passport.authenticate('bnet'));

router.get('/bnet/auth/authenticate/callback',
    passport.authenticate('jwt'),
    passport.authenticate('bnet'),
    blizzAuth.authenticationCallback);

let JwtStrategy = passportJwt.Strategy;

let jwtOptions = {
    jwtFromRequest: function(req) {
        var token = null;
        if (req && req.cookies)
        {
            token = req.cookies['ga-jwt'];
        }
        return token;
    },
    secretOrKey: config.secret
};

passport.use(new JwtStrategy(jwtOptions, userRouter.jwtValidate))

// User Routes
router.post('/signup', userRouter.signup);
router.post('/login', userRouter.login);
router.get('/profile', passport.authenticate('jwt'), userRouter.getProfile);
router.get('/secret', passport.authenticate('jwt'), (req, res) => {
    res.send('success! youre authenticated');
});

router.use('/player', playerRouter);
router.get('/', (req, res) => {
    res.status(200).send("API is accessible");
});

module.exports = router;