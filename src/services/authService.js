const User = require('../models/User');
const jwt = require('../utils/jwt');

const createToken = function ({ username, email, _id: id }, secretKey, options = {}) {
    if (!username || !email || !id || !secretKey) {
        throw new Error('Invalid data: payload claims and secret key are required.');
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
        throw new Error('Invalid token.');
    }

    if (payload.iat <= user._lastLoggedIn) {
        throw new Error('invalid token.');
    }

    return payload;
}

module.exports = {
    createToken,
    verifyToken
}