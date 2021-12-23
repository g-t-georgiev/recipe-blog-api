const router = require('express').Router();

const getFavorites = function (req, res, next) {
    try {

    } catch (error) {
        next(error);
    }
};

const getRecipes = function (req, res, next) {
    try {

    } catch (error) {
        next(error);
    }
};

router.get('/:userId/favorites', getFavorites);
router.get('/:userId/recipes', getRecipes);

module.exports = router;