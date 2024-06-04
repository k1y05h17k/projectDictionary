const express = require('express');
const historyController = require('./../controllers/historyController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams:true })

router.route('/').get(authController.protect,historyController.getAllHistorys).post(authController.protect,historyController.createHistory);

module.exports = router;