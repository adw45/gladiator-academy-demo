const config = require('../config');

let isAuthenticated = (req, res) => {
    if (req.isAuthenticated()) {
        res.send(true);
    } else {
        res.send(false);
    }
};

let logout = (req, res) => {
    req.logout();
    res.redirect('/#/');
};

let authenticationCallback = (req, res) => {
    res.redirect(config.bnet.authRedirectUrl);
}

module.exports = {
    isAuthenticated,
    logout,
    authenticationCallback
};
