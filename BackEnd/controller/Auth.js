const { User } = require('../models/User');

const createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        const data = await user.save();
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const user = await User.findOne({ email });
        if (user) {
            if (password === user.password) {
                res.status(200).json({ user: user?.email, id: user?._id });
            } else {
                res.status(400).json("Invalid Credentials");
            }
        } else {
            res.status(400).json("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports = { createUser, loginUser }