const Blog = require('../models/Blog');

async function getBlogs() {
    return await Blog.find({}).lean();
}

async function getLatest() {
    return await Blog.find({}).sort({ $natural: -1 }).limit(3).lean();
}

async function getBlogById(blogId, isLeanedData = true) {
    if (isLeanedData) {
        return await Blog.findById(blogId).populate('followers').lean();
    } else {
        return await Blog.findById(blogId).populate('followers');
    }
}

async function createBlog(userId, blogData) {
    await Blog.create({
        title: blogData.title,
        image: blogData.image,
        content: blogData.content,
        category: blogData.category,
        owner: userId,
    });
}

async function updateBlog(blogId, blogData) {
    await Blog.findByIdAndUpdate(blogId, {
        title: blogData.title,
        image: blogData.image,
        content: blogData.content,
        category: blogData.category,
    });
}

async function followBlog(blogId, userId) {
    const blog = await Blog.findById(blogId);
    blog.followers.push(userId);
    await blog.save();
}

async function deleteBlog(blogId) {
    await Blog.findByIdAndDelete(blogId);
}

module.exports = {
    getBlogs,
    getLatest,
    getBlogById,
    createBlog,
    followBlog,
    updateBlog,
    deleteBlog,
};
