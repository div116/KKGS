const {Product} = require('../models/Product')

const createProduct = async (req, res) => {
    const product = new Product(req.body)
    try {
        const savedProduct = await product.save()
        res.status(200).json(savedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {createProduct}