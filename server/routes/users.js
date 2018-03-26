let jwt = require('jsonwebtoken'),
    User = require('../data/models/user'),
    config = require('../config'),
    _ = require('lodash'),
    jwtDecode = require('jwt-decode'),
    helper = require('../helpers/helper');

const MAX_LEVEL = 110;

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

let getProfile = (req, res, reason) => {
    let accountName = jwtDecode(req.cookies['ga-jwt']).accountName;

    User.findOne({accountName}, (err, user) => {
        if (err) throw err;

        if (user) {
            res.send(user);
        }
        else {
            res.status(401).send(reason);
        }

    });
}

let jwtValidate = (jwt_payload, next) => {
    User.findOne({accountName: jwt_payload.accountName}, (err, user) => {
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    })
};

let updateCharacterList = (characters, battletag) => {
    const maxLevelCharacters = onlyMaxLevelCharacters(characters);

    User.findOne({blizzardId: battletag}, (err, user) => {
        let characterList = [];

        _.each(maxLevelCharacters, (maxLevelCharacter)=> {
            let raceFaction = helper.getRaceFactionById(maxLevelCharacter.race);

            characterList.push({
                name: maxLevelCharacter.name,
                faction: raceFaction.faction,
                class: helper.getClassById(maxLevelCharacter.class),
                race: raceFaction.race,
                realm: maxLevelCharacter.realm,
                imgUrl: maxLevelCharacter.thumbnail
            });
        });

        user.characters = characterList;
        user.save();
    });
};

const onlyMaxLevelCharacters = (characterList) => {
    return _.pull(_.map(characterList, (character) => {
        if (character.level === MAX_LEVEL) {
            return character;
        }
    }), undefined);
}

module.exports = {
    signup,
    login,
    getProfile,
    jwtValidate,
    updateCharacterList,
};
