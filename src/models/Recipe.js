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
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Category'
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
    },
    reviews: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, {
    timestamps: true
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;