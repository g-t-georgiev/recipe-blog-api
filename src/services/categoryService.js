const Category = require('../models/Category');

module.exports = {
    getAll(filter = {}, projections = {}, options = {}) {
        return Category.find({ ...filter }, { ...projections }, { ...options });
    },
    getOne(id, projections = {}, options = {}) {
        return Category.findById(id, { ...projections }, { ...options });
    }
};