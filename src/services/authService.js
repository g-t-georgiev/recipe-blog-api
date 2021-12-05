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
    
    const user = await User.findById(payload.id);

    if (!user) {
        error = new Error('Error fetching data from database.');
        error.statusCode = 500;
        throw error;
    }

    if (payload.iat <= user._lastLoggedIn) {
        error = new Error('invalid token.');
        error.statusCode = 401;
        throw error;
    }

    return payload;
}

const login = async function (email, password) {
    if (!email || !password) {
        error = new Error('Email and password are required.');
        error.statusCode = 400;
        throw error;
    }

    let user = await User.findOne({ email });
    
    if (!user && !await User.verifyPassword(password)) {
        error = new Error('Incorrect email or password.');
        error.statusCode = 401;
        throw error;
    }

    return user;
}

const register = async function (username, email, password, confirmedPassword) {
    if (!username || !email || !password) {
        error = new Error('All fields are required.');
        error.statusCode = 400;
        throw error;
    }

    if (password !== confirmedPassword) {
        error = new Error('Passwords do not match.');
        error.statusCode = 404;
        throw error;
    }

    let user = await User.find({ username, email });

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

    return User.findByIdAndUpdate(userId, { _lastLoggedIn: Date.now() }, { new: true, lean: true, select: { password: 0 }});
}

module.exports = {
    createToken,
    verifyToken,
    login,
    register,
    logout
}