let isAuthenticated = (req, res) => {
    if (req.isAuthenticated()) {
        res.send(true);
    } else {
        res.send(false);
    }
};

let logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

module.exports = {
    isAuthenticated,
    logout
};
