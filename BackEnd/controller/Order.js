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
    let productCountQuery = Order.find({});
    let totalOrders = await productCountQuery.count().exec();
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
        res.status(200).json({ data, totalOrders });
    } catch (error) {
        res.status(400).json(error)
    }
}

// const fetchAllOrders = async (req, res) => {
//     let query = Order.find({});
//     let totalOrders;
//     try {
//         totalOrders = await Order.countDocuments().exec(); // Updated count method
//     } catch (error) {
//         return res.status(500).json({ error: 'Failed to get total orders count' });
//     }

//     if (req.query._sort && req.query._order) {
//         const { _sort, _order } = req.query;
//         if (!['_sort', '_order'].includes(_sort) || !['asc', 'desc'].includes(_order)) {
//             return res.status(400).json({ error: 'Invalid sort parameters' });
//         }
//         query = query.sort({ [_sort]: _order });
//     }

//     if (req.query._page && req.query._limit) {
//         const { _page, _limit } = req.query;
//         const page = parseInt(_page);
//         const limit = parseInt(_limit);
//         if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
//             return res.status(400).json({ error: 'Invalid pagination parameters' });
//         }
//         query = query.skip(limit * (page - 1)).limit(limit);
//     }

//     try {
//         const data = await query.exec();
//         res.set('X-Total-Orders', totalOrders);
//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch orders' });
//     }
// };

const fetchOrdersByUserId = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await Order.findById(id);
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