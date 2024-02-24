const express = require('express')
const router = express.Router()
const { fetchAllCategories, createCategory } = require('../controller/Category')

router.get('/', fetchAllCategories)
router.post('/', createCategory)

module.exports = router