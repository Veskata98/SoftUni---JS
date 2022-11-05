const User = require('../models/User');
const bcrypt = require('bcrypt');

const login = async (email, password) => {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Incorrect email or password');
    }

    const passCompare = await bcrypt.compare(password, user.hashedPassword);

    if (!passCompare) {
        throw new Error('Incorrect email or password');
    }

    return {
        userId: user._id.toString(),
        email: user.email,
    };
};

const register = async (username, email, password) => {
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (existing) {
        throw new Error('Email already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, hashedPassword });

    return {
        userId: user._id.toString(),
        username: user.username,
        email: user.email,
    };
};

const getUserEmail = async (userId) => {
    const user = await User.findById(userId);
    return user.email;
};

module.exports = {
    login,
    register,
    getUserEmail,
};
