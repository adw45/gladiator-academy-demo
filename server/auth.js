const express = require('express'),
    passport = require('passport'),
    BnetStrategy = require('passport-bnet').Strategy,
    config = require('./config'),
    router = express.Router();

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
    },
        (accessToken, refreshToken, profile, done) => {
            process.nextTick(function () {
                return done(null, profile);
            });
        })
);

router.get('/authenticated', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(true);
    } else {
        res.send(false);
    }
});

router.get('/auth/bnet', passport.authenticate('bnet'));

router.get('/auth/bnet/callback',
    passport.authenticate('bnet', { failureRedirect: '/#/' }),
    (req, res) => {
        res.redirect('/#/');
    }
);

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/#/');
});

module.exports = router;
