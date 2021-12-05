const router = require('express').Router();
const dataController = require('../controllers/dataController');
const authController = require('../controllers/authController');

router.use('/data', dataController);
router.use('/auth', authController);

module.exports = router;