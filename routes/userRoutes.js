const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const historyController = require('./../controllers/historyController');
const favoriteController = require('./../controllers/favoriteController');

const router = express.Router();

// Route for /me
router.get('/me', authController.protect, userController.getMe, userController.getUser);

// Route for me/history
router.get('/me/history', authController.protect, historyController.getAllHistorysForUser)

// Route for me/favorite
router.get('/me/favorite', authController.protect, favoriteController.getAllFavoriteForUser)


module.exports = router;