const router = require('express').Router();
const blogController = require('../controllers/blogController');
const userController = require('../controllers/userController');

router.use('/blog', blogController);
router.use('/user', userController);

module.exports = router;