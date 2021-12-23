const router = require('express').Router();

const categoryService = require('../services/categoryService');

const getAll = async function (req, res, next) {
    try {
        const categories = await categoryService.getAll(null, { title: 1 }, { lean: true });
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
}

const getOne = async function (req, res, next) {
    try {
        const { params: { categoryId }} = req;

        const category = await categoryService.getOne(categoryId, { title: 1 }, { lean: true });
        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
}

router.get('/', getAll);
router.get('/:categoryId', getOne);

module.exports = router;