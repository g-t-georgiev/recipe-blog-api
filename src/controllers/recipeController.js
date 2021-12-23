const router = require('express').Router();

const recipeService = require('../services/recipeService');

let error;

const getAll = async function (req, res, next) {
    const { 
        user, 
        query 
    } = req;

    try {
        const recipes = await recipeService.get();
        res.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
};

const getOne = async function (req, res, next) {
    const { 
        user, 
        query, 
        params: {
            recipeId
        }
    } = req;

    try {
        const recipe = await recipeService.getById(recipeId);
        res.status(200).json(recipe);
    } catch (error) {
        next(error);
    }
};

const createOne = async function (req, res, next) {
    const {
        user,
        body: {
            title,
            description,
            category,
            imageUrl
        }
    } = req;

    title = title?.trim() ?? '';
    description = description?.trim() ?? '';
    category = category?.trim() ?? '';
    imageUrl = imageUrl?.trim() ?? '';

    try {
        if (!user) {
            error = new Error('You are not authorized to create new recipes.');
            error.statusCode = 403;
            throw error;
        }

        await recipeService.create(title, description, category, imageUrl, user.id);
        res.status(201).json();
    } catch (error) {
        next(error);
    }
};

const updateOne = async function (req, res, next) {
    const {
        user,
        body: {
            title,
            description,
            category,
            imageUrl
        }, 
        params: {
            recipeId
        }
    } = req;

    title = title?.trim() ?? '';
    description = description?.trim() ?? '';
    category = category?.trim() ?? '';
    imageUrl = imageUrl?.trim() ?? '';

    try {
        if (!user) {
            error = new Error('You are not authorized to update this recipe.');
            error.statusCode = 403;
            throw error;
        }

        let recipe = await recipeService.update(recipeId, { title, description, category, imageUrl }, { runValidators: true });
        res.status(200).json(recipe);
    } catch (error) {
        next(error);
    }
};

const deleteOne = async function (req, res, next) {
    const {
        user,
        params: {
            recipeId
        }
    } = req;

    try {
        await recipeService.delete(recipeId);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};

router.get('/', getAll);
router.post('/', createOne);
router.get('/:recipeId', getOne);
router.put('/:recipeId', updateOne);
router.delete('/:recipeId', deleteOne);

module.exports = router;