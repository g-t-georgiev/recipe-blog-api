const router = require('express').Router();
const dataController = require('../controllers/dataController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.use('/data', dataController);
router.use('/auth', authController);
router.use('/users', userController);
router.get('*', function (req, res) {
    res.status(404).json({ message: 'Page not found.' });
});

module.exports = router;