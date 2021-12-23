const User = require('../models/User');
const Recipe = require('../models/Recipe');

module.exports = {
    getFavorites(userId, options = {}) {
        return User.findById(userId, { favorites: 1 }, { ...options });
    },
    addFavorite(userId, recipeId, options = {}) {
        return User.findOneAndUpdate({ _id: userId, favorites: { $nin: [ recipeId ]} }, { $addToSet: { favorites: recipeId } }, { ...options });
    },
    removeFavorite(userId, recipeId, options = {}) {
        return User.findOneAndUpdate({ _id: userId, favorites: recipeId }, { $pull: { favorites: recipeId } }, { ...options });
    },
    getRecipes(userId, projections = {}, options = {}) {
        return Recipe.find({ author: userId }, { ...projections }, { ...options });
    }
}