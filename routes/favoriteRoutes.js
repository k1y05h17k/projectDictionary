const express = require('express');
const favoriteController = require('../controllers/favoriteController');
const authController = require('../controllers/authController');

const router = express.Router({mergeParams: true});

router.route('/').get(authController.protect,favoriteController.getAllFavorites).post(authController.protect,favoriteController.createFavorite).delete(authController.protect,favoriteController.deleteFavorite);

module.exports = router;