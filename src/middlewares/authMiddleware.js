module.exports = async function (req, res, next) {
    try {
        const { AUTH_HEADER, AUTH_TOKEN_SECRET } = require('../constants');
        const authService = require('../services/authService');
        const authHeader = req.headers[AUTH_HEADER] || req.headers[AUTH_HEADER.toLowerCase()];
        const accessToken = authHeader && authHeader.split(' ')[1];

        if (!accessToken) {
            next();
            return;
        }

        const payload = await authService.verifyToken(accessToken, AUTH_TOKEN_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        if (['TokenExpiredError', 'JsonWbTokenError'].includes(error.constructor.name)) {
            error.statusCode = 401;
        }
        
        next(error);
    }
}