const { User } = require('../models/User')

const fetchUserById = async (req, res) => {
    const Id  = req.params.id;
    try {
        const user = await User.findById(Id);
        res.status(200).json({ email: user?.email, id: user?._id, addresses: user?.addresses, role: user?.role });
    } catch (error) {
        res.status(400).json(error)
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports = { fetchUserById, updateUser }