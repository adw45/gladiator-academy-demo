let express = require('express'),
    blizzAuth = require('./routes/blizzard-auth'),
    playerRouter = require('./routes/player'),
    userRouter = require('./routes/users'),
    router = express.Router(),
    passport = require('passport'),
    passportJwt = require('passport-jwt'),
    BnetStrategy = require('passport-bnet').Strategy,
    config = require('./config'),
    User = require('./data/models/user');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(
    new BnetStrategy({
        clientID: config.bnet.id,
        clientSecret: config.bnet.secret,
        callbackURL: config.bnet.callbackUrl,
        scope: "wow.profile"
    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(function () {
            return done(null, profile);
        });
    })
);

// Blizzard OAuth routes
router.get('/bnet/auth/isAutheticated', blizzAuth.isAuthenticated);
router.get('/bnet/auth/logout', blizzAuth.logout);
router.get('/bnet/auth/authenticate',  passport.authenticate('bnet'));
router.get('/bnet/auth/authenticate/callback',
    passport.authenticate('bnet', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/');
    }
);

let ExtractJwt = passportJwt.ExtractJwt;
let JwtStrategy = passportJwt.Strategy;

let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: config.secret
};

passport.use(
    new JwtStrategy(jwtOptions, function(jwt_payload, next) {
        User.findOne({accountName: jwt_payload.accountName}, (err, user) => {
            if (user) {
                next(null, user);
            } else {
                next(null, false);
            }
        });

    })
);

// User Routes
router.post('/signup', userRouter.signup);
router.post('/login', userRouter.login);
router.get('/secret', passport.authenticate('jwt'), (req, res) => {
    res.send('success! youre authenticated');
});

router.use('/player', playerRouter);
router.get('/', (req, res) => {
    res.status(200).send("API is accessible");
});

// Account List
// https://us.api.battle.net/wow/user/characters?access_token=c6cafw6pz2mhuvtsa9qhthgc


module.exports = router;