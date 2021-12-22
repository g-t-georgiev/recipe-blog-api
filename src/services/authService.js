const User = require('../models/User');
const jwt = require('../utils/jwt');

let error;

const createToken = function ({ username, email, _id: id }, secretKey, options = {}) {
    if (!username || !email || !id || !secretKey) {
        error = new Error('Invalid data: payload claims and secret key are required.');
        error.statusCode = 400;
        throw error;
    }

    const payload = {
        username,
        email,
        id
    }

    return jwt.sign(payload, secretKey, options);
}

const verifyToken = async function (token, secretKey, options = {}) {
    const payload = await jwt.verify(token, secretKey, options);
    return payload;
}

const login = async function (email, password) {
    if (!email || !password) {
        error = new Error('Email and password are required.');
        error.statusCode = 400;
        throw error;
    }

    let user = await User.findOne({ email });
    const isPasswordValid = await User.verifyPassword(password, user.password);
    
    if (!user || !isPasswordValid) {
        error = new Error('Incorrect email or password.');
        error.statusCode = 401;
        throw error;
    }

    return user;
}

const register = async function (username, email, password) {
    if (!username || !email || !password) {
        error = new Error('All fields are required.');
        error.statusCode = 400;
        throw error;
    }

    let user = await User.findOne({ username, email });

    if (user) {
        error = new Error('Username or email already taken.');
        error.statusCode = 409;
        throw error;
    }

    return User.create({ username, email, password });
}

const logout = function (userId) {
    if (!userId) {
        error = new Error('Invalid token.');
        error.statusCode = 401;
        throw error;
    }

    return User.findById(userId);
}

module.exports = {
    createToken,
    verifyToken,
    login,
    register,
    logout
}