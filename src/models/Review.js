const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const reviewSchema = new Schema({
    comment: {
        type: String,
        default: '',
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    recipe: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Recipe'
    }
}, {
    timestamps: true
});

const Review = model('Review', reviewSchema);

module.exports = Review;