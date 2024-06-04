const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  
    res.cookie('jwt', token, cookieOptions);
  
    // Remove password from output
    user.password = undefined;
  
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  };

  exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });
  
    createSendToken(newUser, 201, res);
  });

  exports.signin = catchAsync(async (req, res, next) => {

    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400))
    }
    // Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    // IF Wrong User  or Invalid Password show this error 401
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    // If everthing ok, send token to client
    const token = signToken(user._id);

    res.status(200).json({
        status: 'sucess',
        token
    });
});

// Checked if current user has logged
exports.protect = catchAsync(async (req, res, next) => {

    // 1) Getting token and check of it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      }
    console.log(token);

    if(!token){
        return next(new AppError('You are not logged in! Please Log in to get acess.', 401));
    }
    // 2) Verification token

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if(!currentUser){
        return next( new AppError('The user belonging tho this Token does no longer exist!',401))

    }

      // GRANT ACCESS TO PROTECTED ROUTE
      req.user = currentUser;
      res.locals.user = currentUser;
      next();
    });
