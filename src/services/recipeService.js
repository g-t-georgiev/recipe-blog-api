const Recipe = require('../models/Recipe');

module.exports = {
    get(filter = {}, projections = {}, options = {}) {
        return Recipe
            .find(filter, { ...projections }, { ...options })
            .populate({ path: 'author', select: 'username' })
            .populate({ path: 'rating', select: 'rating recipe' })
            .populate({ path: 'reviewCount', select: 'rating recipe' });
    },
    getById(id, projections = {}, options = {}) {
        return Recipe.findById(id, { ...projections }, { ...options })
            .populate({ path: 'author', select: 'username' })
            .populate({ path: 'rating', select: 'rating recipe' })
            .populate({ path: 'reviewCount', select: 'rating recipe' });
    },
    create(title, description, category, imageUrl, author) {
        return Recipe.create({ title, description, category, imageUrl, author });
    },
    async update(id, data, options = {}) {
        return Recipe.findByIdAndUpdate(id, data, { ...options })
            .populate({ path: 'author', select: 'username' })
            .populate({ path: 'rating', select: 'rating recipe' })
            .populate({ path: 'reviewCount', select: 'rating recipe' });
    },
    delete(id, options = {}) {
        return Recipe.findByIdAndDelete(id, { ...options });
    }
};