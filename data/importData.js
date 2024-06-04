const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Dic = require('./../models/dictionaryModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('DB Connection successful!'));

// READ JSON FILE
const rawWords = JSON.parse(fs.readFileSync(`${__dirname}/words_dictionary.json`, 'utf-8'));
console.log('Data successfully Loaded!');

// Transform the raw words object into an array of { word, number } objects


// Import Data INTO DB
const words = Object.entries(rawWords).map(([word, number]) => ({ word, number }));

// Import Data INTO DB
const importData = async () => {
    try {
        await Dic.insertMany(words);
        console.log('Data successfully imported!');
        process.exit();
    } catch (err) {
        console.log('Error importing data:', err);
        process.exit(1);
    }
};

if (process.argv[2] === '--import') {
    importData();
} 
