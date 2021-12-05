const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../constants');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        minlength: [4, 'Username should be at least 4 characters long.'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        validate: [/.+@.+\..+/i, 'Invalid email format.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        min: [6, 'Password should be at least 6 characters long.']
    },
    _lastLoggedIn: {
        type: Date,
        default: 0
    }
}, 
{ timestamps: {
    createdAt: '_createdAt',
    updatedAt: '_updatedAt'
}});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    return next();
});

userSchema.statics.verifyPassword = function (password) {
    console.log('Provided password: ' + password);
    console.log('Hashed password of user: ' + this.password);
    return bcrypt.compare(password, this.password);
}

const User = model('User', userSchema);

module.exports = User;