const express = require('express');
const { newOrder, getSingleOrder, updateOrder, deleteOrder } = require('../controllers/orderController');
const router = express.Router();

router.route('/order/new').post(newOrder);
router.route('/order/:id').get(getSingleOrder);
router.route('/order/:id').put(updateOrder);
router.route('/order/:id').delete(deleteOrder);

module.exports=router;

