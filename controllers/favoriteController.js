const Favorite = require('./../models/favoriteModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllFavoriteForUser = catchAsync(async (req, res, next) => {
   
    let userId;

    try {
        userId = ObjectId(req.user.id);
    } catch (error) {
        return res.status(400).json({ status: 'fail', message: 'Invalid user ID format' });
    }
    
    const favoriteUser = await Favorite.find({user:userId}).select('-_id -__v -user');;
    const favorite = favoriteUser.map(favorite => ({word:favorite.word.word,createAt: favorite.createAt}));
    res.status(200).json({
        status: 'sucess',
            results: favorite.length,
        data: {
            favorite,
        }
    })
});


exports.getAllFavorites = catchAsync(async(req, res, next) => {

    const favorites = await Favorite.find();

    res.status(200).json({
        status:'sucess',
        results: reviews.length,
        data:{
            favorites
        }
    });
});

exports.createFavorite = catchAsync(async(req, res, next) => {

    const favorites = await Favorite.create(req.body);

    res.status(201).json({
        status: 'success',
        data:{
            favorite:favorites
        }
    });
});

exports.deleteFavorite = catchAsync(async(req, res, next) => {
    const favoriteSearch = await Favorite.find(req.word);

    const id = favoriteSearch[0]._id
    const favorite = await Favorite.findByIdAndDelete(id);

    if(!favorite){
        return next(new AppError(`No favorite found with that ID: ${id} `,404));
    }

    res.status(204).json({
        status:'success',
        data:null
    });
});