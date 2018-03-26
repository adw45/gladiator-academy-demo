let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let CharacterSchema = new Schema({
    name: {type: String, required: 'Character must have a name'},
    faction: {type: String, required: 'Character must have a faction'},
    class: {type: String, required: 'Character must have a class'},
    race: {type: String, required: 'Character must have a race'},
    realm: {type: String, required: 'Character must have a realm'},
    imageUr: {type: String}
});

module.exports = CharacterSchema;
