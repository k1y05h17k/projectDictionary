const express = require('express');
const dictionaryController = require('./../controllers/dictionaryController');
const authController = require('./../controllers/authController');
const favoriteRouter = require('./../routes/favoriteRoutes');
const router = express.Router();

router.route('/en').get(authController.protect, dictionaryController.getAllWords);
router.route('/en/:word').get(authController.protect, dictionaryController.getWord);
router.use('/en/:word/favorite', favoriteRouter);
router.use('/en/:word/unfavorite', favoriteRouter)

module.exports = router;