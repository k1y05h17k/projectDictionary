const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({

    createAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    word: {
        type: mongoose.Schema.ObjectId,
        ref: 'word',
        // unique: true
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Middleware para adicionar o usuário e a palavra ao histórica ao pesquisar a palavra.
historySchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name'
    }).populate({
        path: 'word',
        select: 'word'
    });

    next();
});

const History = mongoose.model('History', historySchema);

module.exports = History;