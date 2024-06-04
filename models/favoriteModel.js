const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({

    createAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true]
    },
    word: {
        type: mongoose.Schema.ObjectId,
        ref: 'word',
        required: [true],
        unique: true
    }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

favoriteSchema.pre(/^find/, function (next) {

    this.populate({
        path: 'user',
        select: 'name'
    }).populate({
        path: 'word',
        select: 'name'
    });
    next();
});


module.exports = Favorite;