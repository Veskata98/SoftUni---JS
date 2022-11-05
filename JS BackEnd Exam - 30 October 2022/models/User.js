const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        minlength: [2, 'Username must be atleast 2 characters long'],
    },
    email: {
        type: String,
        minlength: [10, 'Email must be atleast 10 characters long'],
    },
    hashedPassword: { type: String, required: true },
});

userSchema.index(
    { email: 1 },
    {
        unique: true,
        collation: {
            locale: 'en',
            strength: 2,
        },
    },
);

const User = model('User', userSchema);

module.exports = User;
