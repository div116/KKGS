const express = require('express')
const router = express.Router()
const { fetchAllBrands, createBrand } = require('../controller/Brand')

router.post('/', createBrand);
router.get('/' , fetchAllBrands);

module.exports = router