const express = require('express')
const router = express.Router()
const { createOrder, updateOrder, fetchAllOrders } = require('../controller/Order')

router.post('/', createOrder);
router.patch('/:id', updateOrder);
router.get('/', fetchAllOrders);

module.exports = router