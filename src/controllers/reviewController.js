const router = require('express').Router();

const reviewService = require('../services/reviewService');

let error;

const getAll = async function (req, res, next) {
    try {
        const { 
            user, 
            query 
        } = req;

        if (!query.hasOwnProperty('recipeId')) {
            error = new Error('Missing recipe id on reviews fetching.');
            error.statusCode = 400;
            throw error;
        }

        const reviews = await reviewService.getAll({ recipe: query.recipeId }, { recipe: 0 }, { populate: 'author' });
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
}

const create = async function (req, res, next) {
    try {
        let {
            user,
            body: {
                comment,
                rating,
                authorId,
                recipeId
            }
        } = req;

        comment = comment?.trim() ?? '';
        rating = rating?.trim() ?? '';
        authorId = authorId?.trim() ?? '';
        recipeId = recipeId?.trim() ?? '';

        if (!user) {
            error = new Error('Not authorized to create resouces.');
            error.statusCode(401);
            throw error;
        }

        await reviewService.create(comment, rating, authorId, recipeId);
        res.status(201).json();
    } catch (error) {
        next(error);
    }
}

const getOne = async function (req, res, next) {
    try {
        const { 
            user, 
            params: {
                reviewId
            }
        } = req;

        if (!user) {
            error = new Error('Not authorized to view this resouce.');
            error.statusCode(401);
            throw error;
        }

        const review = await reviewService.getOne(reviewId, { author: 0, recipe: 0 });
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
}

const updateOne = async function (req, res, next) {
    try {
        let { 
            user, 
            body: {
                comment,
                rating,
                authorId,
                recipeId
            },
            params: {
                reviewId
            }
        } = req;

        comment = comment?.trim() ?? '';
        rating = rating?.trim() ?? '';
        authorId = authorId?.trim() ?? '';
        recipeId = recipeId?.trim() ?? '';

        if (!user) {
            error = new Error('Not authorized to modify this resouce.');
            error.statusCode(401);
            throw error;
        }

        if (user.id !== authorId) {
            error = new Error('Not authorized to modify this resouce.');
            error.statusCode(403);
            throw error;
        }

        const review = await reviewService.update(reviewId, { comment, rating }, { runValidators: true });
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
}

const deleteOne = async function (req, res, next) {
    try {
        let { 
            user,
            params: {
                reviewId
            }
        } = req;

        if (!user) {
            error = new Error('Not authorized to modify this resouce.');
            error.statusCode(401);
            throw error;
        }

        await reviewService.delete(reviewId);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
}

router.get('/:reviewId', getOne);
router.put('/:reviewId', updateOne);
router.delete('/:reviewId', deleteOne);
router.get('/', getAll);
router.post('/', create);

module.exports = router;