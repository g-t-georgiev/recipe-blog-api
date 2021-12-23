const router = require('express').Router();

const recipeController = require('./recipeController');
const categoryController = require('./categoryController');
const reviewController = require('./reviewController');

router.use('/recipes', recipeController);
router.use('/categories', categoryController);
router.use('/reviews', reviewController);
router.get('*', function (req, res) {
    res.status(404).json({ message: 'Page not found.' });
});

module.exports = router;