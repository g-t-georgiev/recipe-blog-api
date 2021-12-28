const Recipe = require('../models/Recipe');

module.exports = {
    get(filter = {}, projections = {}, options = {}) {
        return Recipe
            .findOne(filter, { ...projections }, { ...options })
            .populate({ path: 'author', select: 'username' })
            .populate({ path: 'rating', select: 'rating recipe' });
    },
    getById(id, projections = {}, options = {}) {
        return Recipe.findById(id, { ...projections }, { ...options });
    },
    create(title, description, category, imageUrl, author) {
        return Recipe.create({ title, description, category, imageUrl, author });
    },
    update(id, data, options = {}) {
        return Recipe.findByIdAndUpdate(id, data, { ...options });
    },
    delete(id, options = {}) {
        return Recipe.findByIdAndDelete(id, { ...options });
    }
};