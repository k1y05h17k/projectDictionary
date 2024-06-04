const History = require('./../models/historyModel');
const catchAsync = require('./../utils/catchAsync');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


exports.getAllHistorysForUser = catchAsync(async (req, res, next) => {
   
    let userId;

    try {
        userId = ObjectId(req.user.id);
    } catch (error) {
        return res.status(400).json({ status: 'fail', message: 'Invalid user ID format' });
    }
    
    const historyUser = await History.find({user:userId}).select('-_id -__v -user');;
    const history = historyUser.map(history => ({word:history.word.word,createAt: history.createAt}));
    res.status(200).json({
        status: 'sucess',
            results: history.length,
        data: {
            history,
        }
    })
});


exports.getAllHistorys = catchAsync(async (req, res, next) => {

    let filter = {}

    if (req.params.wordId) filter = { word: req.params.wordId };

    const history = await History.find(filter);

    res.status(200).json({

        status: 'sucess',
        results: word.length,
        data: {
            history
        }
    });
});


exports.createHistory = catchAsync(async (req, res, next) => {
    console.log(req.params)
    if (!req.body.word) req.body.word = req.params.word;
    if (!req.body.user) req.body.user = req.user.id;

    const historys = await History.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            history: historys
        }
    });

})
