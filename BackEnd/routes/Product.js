const express = require('express')
const { addproduct, fetchAllProductsByFilter, fetchProductById, updateProduct } = require('../controller/Product')
const router = express.Router()

router.post('/', addproduct);
router.get('/', fetchAllProductsByFilter);
router.get('/:id', fetchProductById);
router.patch('/:id', updateProduct);

module.exports = router