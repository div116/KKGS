const { User } = require('../models/User');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'SECRET_KEY';

const createUser = async (req, res) => {
    try {
        var salt = crypto.randomBytes(16);
        crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async (err, hashedPassword) => {
            const user = new User({ ...req.body, password: hashedPassword, salt });
            const data = await user.save();
            req.login(data, (err) => {
                if (err) {
                    return next(err);
                } else {
                    const token = jwt.sign({ id: data.id, email: data.email, role: data.role }, SECRET_KEY);
                    return res.status(201).json(token);
                }
            })
        })

    } catch (err) {
        res.status(400).json(err);
    }
};

const loginUser = async (req, res) => {
    res.status(200).json(req.user);
};

const checkUser = async (req, res) => {
    if (req.user) {
        res.status(200).json({ id: req.user._id, email: req.user.email, role: req.user.role });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = { createUser, loginUser, checkUser }