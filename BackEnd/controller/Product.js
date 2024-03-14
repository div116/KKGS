const { Product } = require('../models/Product')

const addproduct = async (req, res) => {
    const product = new Product(req.body)
    try {
        const savedProduct = await product.save()
        res.status(200).json(savedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
}

// const fetchAllProducts = async (req, res) => {
//     try {
//         const products = await Product.find()
//         res.status(200).json(products)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// }

const fetchAllProductsByFilter = async (req, res) => {
    // let condition = {}
    // if (!req.query.admin) {
    //     condition.deleted = { $ne: true }
    // }

    let query = Product.find();
    let totalProductsQuery = Product.find();

    if (req.query.category) {
        query = query.find({ category: { $in: req.query.category.split(',') } });
        totalProductsQuery = totalProductsQuery.find({
            category: { $in: req.query.category.split(',') },
        });
    }
    if (req.query.brand) {
        query = query.find({ brand: { $in: req.query.brand.split(',') } });
        totalProductsQuery = totalProductsQuery.find({ brand: { $in: req.query.brand.split(',') } });
    }
    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order });
    }

    const totalDocs = await totalProductsQuery.count().exec();

    if (req.query._page && req.query._limit) {
        const pageSize = req.query._limit;
        const page = req.query._page;
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    try {
        const docs = await query.exec();
        res.status(200).json({ docs, totalDocs });
    } catch (err) {
        res.status(400).json(err);
    }
}

const fetchProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json(err);
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        product.discountPrice = Math.round(product.price * (1 - product.discountPercentage / 100))
        const updatedProduct = await product.save()
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports = { addproduct, fetchAllProductsByFilter, fetchProductById, updateProduct }