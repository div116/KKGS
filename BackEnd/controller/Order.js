const { Order } = require('../models/Order');

const createOrder = async (req, res) => {
    const order = new Order(req.body);
    try {
        const data = await order.save();
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json(error)
    }
}

const updateOrder = async (req, res) => {
    const id = req.params.id;
    const updateOrder = req.body;
    try {
        const data = await Order.findByIdAndUpdate(id, updateOrder, { new: true });
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json(error)
    }

}

const fetchAllOrders = async (req, res) => {
    let query = Order.find({});
    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order });
    }
    if (req.query._page && req.query._limit) {
        const pageSize = req.query._limit;
        const page = req.query._page;
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    try {
        const data = await query.exec();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error)
    }
}

const fetchOrdersByUserId = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Order.find({ user: id });
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {
    createOrder,
    updateOrder,
    fetchAllOrders,
    fetchOrdersByUserId
}