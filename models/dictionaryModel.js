const mongoose = require('mongoose');

const DictionarySchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: Number,
        required: true
    }
});

DictionarySchema.virtual('historys', {
    ref: 'historys',
    foreignField: 'word',
    localField: '_id'
})

const word = mongoose.model('word', DictionarySchema);

module.exports = word;