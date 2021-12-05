module.exports = async function (req, res, next) {
    try {
        const { AUTH_HEADER, AUTH_COOKIE, AUTH_TOKEN_SECRET } = require('../constants');
        const authService = require('../services/authService');
        const accessToken = req.headers[AUTH_HEADER] || req.cookies[AUTH_COOKIE];

        if (!accessToken) {
            next();
            return;
        }

        const payload = authService.verifyToken(accessToken, AUTH_TOKEN_SECRET);
        payload.iat *= 1e3;
        payload.exp *= 1e3;
        req.user = payload;
        next();
    } catch (error) {
        if (['TokenExpiredError', 'JsonWbTokenError'].includes(error.constructor.name)) {
            error.statusCode = 401;
        }

        res.clearCookie(AUTH_COOKIE);
        next(error);
    }
}