const router = require('express').Router();
const dataController = require('../controllers/dataController');
const userController = require('../controllers/userController');

router.use('/data', dataController);
router.use('/user', userController);

module.exports = router;