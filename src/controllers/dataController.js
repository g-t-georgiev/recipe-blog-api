const router = require('express').Router();

const recipeController = require('./recipeController');
const categoryController = require('./categoryController');
const reviewController = require('./reviewController');

router.use('/recipes', recipeController);
router.use('/categories', categoryController);
router.use('/reviews', reviewController);

module.exports = router;