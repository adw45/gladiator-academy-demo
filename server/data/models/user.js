let mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    characterSchema = require('./character'),
    Schema = mongoose.Schema;

let UserSchema = new Schema({
    accountName: {type: String, unique: true, required: 'Account Name invalid'},
    email: {type: String, unique:true, lowercase: true, required: 'Email invalid'},
    blizzardId: {type: String, required: 'BlizzardId invalid'},
    password: {type: String, required: 'Password Invalid', select: false},
    characters: [characterSchema]
});

UserSchema.pre('save', function(next) {
    let user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        });
    });
});

UserSchema.statics.authenticate = function(data, callback) {
    this.findOne({accountName: data.accountName}).select('+password').exec((err, user) => {
        if (err) return callback(err);

        if (!user) return callback(null, null, 'USER NOT FOUND');

        user.comparePassword(data.password, (err, isMatch) => {
            if (err) return callback(err);
            if (isMatch) return callback(null, user);

            return callback(null, null, 'INCORRECT PASSWORD')
        })
    });
};

UserSchema.methods.comparePassword = function(candidatePassword,callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        callback(err, isMatch);
    });
};

module.exports = mongoose.model('user', UserSchema);
