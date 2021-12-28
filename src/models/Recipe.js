const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required.']
    },
    description: {
        type: String,
        required: [true, 'Description is required.']
    },
    category: {
        type: String,
        required: [true, 'Category is required.']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image url is required.'],
        validate: [/^https?:\/\//i, 'Invalid image url format.']
    },
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

recipeSchema.virtual('rating', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'recipe'
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;