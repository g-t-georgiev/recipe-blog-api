const Review = require('../models/Review');

module.exports = {
    getAll(filter = {}, projections = {}, options = {}) {
        return Review.find({ ...filter }, { ...projections }, { ...options });
    },
    getOne(id, projections = {}, options = {}) {
        return Review.findById(id, { ...projections }, { ...options });
    },
    create(comment, rating, author, recipe) {
        return Review.create({ comment, rating, author, recipe });
    },
    update(id, data, options = {}) {
        return Review.findByIdAndUpdate(id, data, { ...options });
    },
    delete(id, options = {}) {
        return Review.findByIdAndDelete(id, { ...options });
    }
};