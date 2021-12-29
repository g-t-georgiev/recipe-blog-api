const router = require('express').Router();

const recipeService = require('../services/recipeService');
const userService = require('../services/userService');

let error;

const getFavorites = async function (req, res, next) {
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
            error = new Error('Not authorized to view this page.');
            error.statusCode = 401;
            throw error;
        }

        if (user.id !== userId) {
            error = new Error('Not authorized to view this page.');
            error.statusCode = 403;
            throw error;
        }

        if (recipeId) {
            const isFavorite = await userService.isFavorite(userId, recipeId);
            // console.log(isFavorite);
            res.status(200).json(isFavorite);
            return;
        }

        let recipes = await userService.getFavorites(userId);
        res.status(200).json(recipes);
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

        const isFavorite = await userService.isFavorite(userId, recipeId);

        if (isFavorite) {
            error = new Error('Recipe is already in your list of favorites.');
            error.statusCode = 403;
            throw error;
        }

        await userService.addFavorite(userId, recipeId);
        res.status(201).json();
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

        const recipes = await userService.getRecipes(userId);
        console.log(recipes);
        res.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
};

const isAuthorized = async function (req, res, next) {
    try {
        let {
            user,
            params: {
                userId
            },
            body: {
                recipeId
            }
        } = req;

        if (!user) {
            error = new Error('Not authorized to use this functionality.');
            error.statusCode = 401;
            throw error;
        }

        const isAuthorized = await userService.isAuthorized(userId, recipeId);
        res.status(200).json(isAuthorized);
    } catch (error) {
        next(error);
    }
}

router.post('/:userId/me', isAuthorized);
router.get('/:userId/favorites', getFavorites);
router.post('/:userId/favorites', addFavorite);
router.delete('/:userId/favorites', removeFavorite);
router.get('/:userId/recipes', getRecipes);
router.get('*', function (req, res) {
    res.status(404).json({ message: 'Page not found.' });
});

module.exports = router;