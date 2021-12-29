const User = require('../models/User');
const Recipe = require('../models/Recipe');

module.exports = {
    async getFavorites(userId, options = {}) {
        const recipes = (await User
            .findById(userId, { favorites: 1 }, { ...options })
            .populate('favorites'))?.favorites ?? [];
        
        return Promise
        .all(recipes
        .map(async (recipe) => await Recipe.findById(recipe.id)
            .populate({ path: 'author', select: 'username' })
            .populate({ path: 'rating', select: 'rating recipe' })
            .populate({ path: 'reviewCount', select: 'rating recipe' })
        ));
    },
    async isFavorite(userId, recipeId) {
        const recipes = (await User
            .findById(userId, { favorites: 1 })
            .populate('favorites'))?.favorites ?? [];
        
        return recipes.some(recipe => recipe.id == recipeId);
    },
    addFavorite(userId, recipeId, options = {}) {
        return User.findOneAndUpdate({ _id: userId, favorites: { $nin: [ recipeId ]} }, { $addToSet: { favorites: recipeId } }, { ...options });
    },
    removeFavorite(userId, recipeId, options = {}) {
        return User.findOneAndUpdate({ _id: userId, favorites: recipeId }, { $pull: { favorites: recipeId } }, { ...options });
    },
    getRecipes(userId, projections = {}, options = {}) {
        const recipes = Recipe.find({ author: userId }, { ...projections }, { ...options })
        .populate('favorites')?.favorites ?? [];

        return Promise
        .all(recipes
        .map(async (recipe) => await Recipe.findById(recipe.id)
            .populate({ path: 'author', select: 'username' })
            .populate({ path: 'rating', select: 'rating recipe' })
            .populate({ path: 'reviewCount', select: 'rating recipe' })
        ));
    },
    async isAuthorized(userId, recipeId) {
        const recipe = await Recipe.findById(recipeId)
        return recipe.author == userId;
    }
}