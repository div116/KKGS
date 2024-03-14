const express = require('express')
const router = express.Router()
const { createOrder, updateOrder, fetchAllOrders, fetchOrdersByUserId } = require('../controller/Order')

router.post('/', createOrder);
router.patch('/:id', updateOrder);
router.get('/', fetchAllOrders);
router.get('/:id', fetchOrdersByUserId);

module.exports = router