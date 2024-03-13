const { Cart } = require('../models/Cart');

const fetchCartByUser = async (req, res) => {
  const  id  = req.query.user;
  try {
    const cartItems = await Cart.find({ user: id }).populate('user').populate('product');
    
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(400).json(err);
  }
};

const addToCart = async (req, res) => {
  const cart = new Cart(req.body);
  try {
    const data = await cart.save();
    const result = await data.populate('product');
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteFromCart = async (req, res) => {
    const { id } = req.params;
    try {
    const data = await Cart.findByIdAndDelete(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const result = await cart.populate('product');

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
    fetchCartByUser,
    addToCart,
    deleteFromCart,
    updateCart
}