let _ = require('lodash');

const createPlayer = (id, isLeader) => {
    return {
        id,
        leader: isLeader
    }
}

const updateNickname = (players, id, data) => {
    let player = _.find(players, {id});
    if (player) {
        player.nickname = data.nickname;
    }
    return players;
}

const updateBlizzardId = (players, id, data) => {
    let player = _.find(players, {id});
    if (player) {
        player.blizzardId = data.blizzardId;
    }
    return players;
}

const updateCharacterName = (players, id, data) => {
    let player = _.find(players, {id});
    if (player) {
        player.characterName = data.characterName;
    }
    return players;
}

const updateClassSpec = (players, id, data) => {
    let player = _.find(players, {id});
    if (player) {
        player.classSpec = data.classSpec;
    }
    return players;
}

const updateFaction = (players, id, data) => {
    let player = _.find(players, {id});
    if (player) {
        player.faction = data.faction;
    }
    return players;
}

const updateLeader = (players, ids) => {
    let oldLeader = _.find(players, {id: ids.oldLeader});

    if (!oldLeader.leader) {
        return players;
    }

    let newLeader = _.find(players, {id: ids.newLeader});

    if (oldLeader && newLeader) {
        oldLeader.leader = false;
        newLeader.leader = true;
    }

    return players;
}

module.exports = {
    createPlayer,
    updateNickname,
    updateBlizzardId,
    updateCharacterName,
    updateClassSpec,
    updateFaction,
    updateLeader
}