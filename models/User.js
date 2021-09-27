const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    id: {
        type: String,
        maxlength: 16,
        unique: 1
    },
    password: {
        type: String,
        minlength: 6
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

userSchema.pre('save', function (next) {
    var user = this;

    // password 변경될때만 암호화함
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) next(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
})

userSchema.methods.comparePassword = function (plainPassword, callback) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) callback(err);
        callback(null, isMatch)
    })
}

userSchema.methods.generateToken = function (callback) {
    var user = this;

    // token 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save(function (err, user) {
        if (err) callback(err);
        callback(null, user);
    })
}

userSchema.statics.findByToken = function (token, callback) {
    var user = this;

    // 토큰을 decode 함
    jwt.verify(token, 'secretToken', function (err, decoded) {
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) callback(err);
            callback(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User };