const { Schema, model, Types } = require('mongoose');

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: [5, 'Title must contain between 5 and 50 characters'],
        maxlength: [50, 'Title must contain between 5 and 50 characters'],
    },
    image: { type: String, required: true },
    content: { type: String, required: true, minlength: [10, 'Content should be atleast 10 characters long'] },
    category: { type: String, required: true, minlength: [3, 'Category should be atleast 3 characters long'] },
    followers: { type: [Types.ObjectId], default: [], ref: 'User' },
    owner: { type: Types.ObjectId, required: true, ref: 'User' },
});

blogSchema.path('image').validate((val) => {
    urlRegex = /https?:\/\/./;
    return urlRegex.test(val);
}, 'Invalid Image URL');

const Blog = model('Blog', blogSchema);

module.exports = Blog;
