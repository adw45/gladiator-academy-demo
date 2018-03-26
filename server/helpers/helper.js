const characterData = require('./character-data.json'),
    _ = require('lodash');

let getGenderById = (genderId) => {
    return id === 0 ? 'male' : 'female';
}

let getRaceFactionById = (raceId) => {
    let raceFaction = _.find(characterData.race, {id: raceId})
    return {
        race: _.kebabCase(raceFaction.name),
        faction: raceFaction.side
    }
}

let getClassById = (classId) => {
    return _.kebabCase(_.find(characterData.class, {id: classId}).name);
}

module.exports = {
    getClassById,
    getRaceFactionById,
    getGenderById
}