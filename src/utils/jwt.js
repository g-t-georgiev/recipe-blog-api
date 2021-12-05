const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = {
    sign(payload, secretKey, options) {
        return promisify(jwt.sign).call(jwt, payload, secretKey, options);
    },
    verify(token, secretKey, options) {
        return promisify(jwt.verify).call(jwt, token, secretKey, options);
    }
}