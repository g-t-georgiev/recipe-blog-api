const router = require('express').Router();
const authService = require('../services/authService');
const { AUTH_TOKEN_SECRET, AUTH_COOKIE } = require('../constants');

let error;

const login = async function (req, res, next) {
    try {
        let { 
            user,
            body: {
                email,
                password
            }
        } = req;

        if (user) {
            error = new Error('You are already logged in.');
            error.statusCode = 403;
            throw error;
        }

        email = email?.trim() ?? '';
        password = password?.trim() ?? '';

        const userData = await authService.login(email, password);
        const accessToken = await authService.createToken(userData, AUTH_TOKEN_SECRET, { expiresIn: '1d' });
        res.cookie(AUTH_COOKIE, accessToken);
        res.status(200).json({ id: userData._id, username: userData.username, email: userData.email });
    } catch (error) {
        next(error);
    }
}

const register = async function (req, res, next) {
    try {
        let {
            user,
            body: {
                username,
                email,
                password,
                confirmPassword
            }
        } = req;

        if (user) {
            error = new Error('You are already logged in.');
            error.statusCode = 403;
            throw error;
        }

        username = username?.trim() ?? '';
        email = email?.trim() ?? '';
        password = password?.trim() ?? '';
        confirmPassword = confirmPassword?.trim() ?? '';

        await authService.register(username, email, password, confirmPassword);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
}

const logout = async function (req, res, next) {
    try {
        let { user } = req;

        if (!user) {
            error = new Error('Invalid token.');
            error.statusCode = 401;
            throw error;
        }
        
        await authService.logout(user?.id);
        res.clearCookie(AUTH_COOKIE);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
}

router.post('/login', login);
router.post('/register', register);
router.delete('/logout', logout);

module.exports = router;