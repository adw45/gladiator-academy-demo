const getConfig = () => {
    if (process.env.NODE_ENV === 'production') {
        return require('./config/heroku.json');
    }
    else return require('./config/local.json');
}

module.exports = getConfig();
