const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');


exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: 'sucess',
        result: users.length,
        data: {
            users
        }
    });

});


exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            staus: 'sucess',
            results: user.length,
            data: {
                user
            }
        });
    } catch (err) {
        res.status(404).json({
            staus: 'fail',
            message: err
        });
    }
};

exports.createUser = async (req, res) => {

    try {
        const newUser = await User.create(req.body);

        res.status(201).json({
            staus: 'sucess',
            data: {
                user: newUser
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};