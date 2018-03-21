let jwt = require('jsonwebtoken'),
    User = require('../data/models/user'),
    config = require('../config');

let signup = (req, res, next) => {
    let user = new User(req.body);

    user.save((err, user) => {
        if (err) { return next(err) }
        res.status(200).send(user)
    });
};

let login = (req, res, next) => {
    User.authenticate(req.body, (err, user, reason) => {
        if (err) throw err;

        if (user) {
            res.status(201).send({
                message: 'ok',
                token: jwt.sign({accountName: user.accountName}, config.secret)
            });
        }

        res.status(401).send(reason);
    });
};

let update = (req, res) => {
    console.log('update');
}


let _delete = (req, res) => {
    console.log('delete')
}

module.exports = {
    signup,
    update,
    login,
    delete: _delete
};
