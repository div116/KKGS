const { User } = require('../models/User')

const fetchUserById = async (req, res) => {
    const { Id } = req.params;
    try {
        const user = await User.findById(Id, 'name, email, id').exec()
        res.status(200).json(user)
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