const router = require('express').Router();

const userService = require('../services/userService');

let error;

const getFavorites = async function (req, res, next) {
    try {
        const {
            user,
            params: {
                userId
            }
        } = req;

        if (!user) {
            error = new Error('Not authorized to view this page.');
            error.statusCode = 401;
            throw error;
        }

        if (user.id !== userId) {
            error = new Error('Not authorized to view this page.');
            error.statusCode = 403;
            throw error;
        }

        const favorites = (await userService.getFavorites(userId))?.favorites ?? [];
        res.status(200).json(favorites);
    } catch (error) {
        next(error);
    }
};

const addFavorite = async function (req, res, next) {
    try {
        const {
            user,
            params: {
                userId
            },
            body: {
                recipeId
            }
        } = req;

        if (!user) {
            error = new Error('Not authorized to use this feature.');
            error.statusCode = 401;
            throw error;
        }

        if (user.id !== userId) {
            error = new Error('Not authorized to use this feature.');
            error.statusCode = 403;
            throw error;
        }

        await userService.addFavorite(userId, recipeId);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
}

const removeFavorite = async function (req, res, next) {
    try {
        const {
            user,
            query: {
                recipeId
            },
            params: {
                userId
            }
        } = req;

        if (!user) {
            error = new Error('Not authorized to use this feature.');
            error.statusCode = 401;
            throw error;
        }

        if (user.id !== userId) {
            error = new Error('Not authorized to use this feature.');
            error.statusCode = 403;
            throw error;
        }

        await userService.removeFavorite(userId, recipeId);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
}

const getRecipes = async function (req, res, next) {
    try {
        const {
            user,
            params: {
                userId
            }
        } = req;

        if (!user) {
            error = new Error('Not authorized to view this page.');
            error.statusCode = 401;
            throw error;
        }

        if (user.id !== userId) {
            error = new Error('Not authorized to view this page.');
            error.statusCode = 403;
            throw error;
        }

        const recipes = (await userService.getRecipes(userId)) ?? [];
        res.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
};

router.get('/:userId/favorites', getFavorites);
router.post('/:userId/favorites', addFavorite);
router.delete('/:userId/favorites', removeFavorite);
router.get('/:userId/recipes', getRecipes);
router.get('*', function (req, res) {
    res.status(404).json({ message: 'Page not found.' });
});

module.exports = router;