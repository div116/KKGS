const { Brand } = require('../models/Brand')

const fetchAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find()
        res.status(200).json(brands)
    } catch (error) {
        res.status(400).json(error)
    }
}

const createBrand = async (req, res) => {
    const brand = new Brand(req.body);
    try {
      const data = await brand.save();
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  };

module.exports = { fetchAllBrands, createBrand }