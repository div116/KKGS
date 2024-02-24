const { Category } = require('../models/Category')

const fetchAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        res.status(400).json(error)
    }
}

const createCategory = async (req, res) => {
    const category = new Category(req.body);
    try {
      const data = await category.save();
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  };

module.exports = { fetchAllCategories, createCategory }