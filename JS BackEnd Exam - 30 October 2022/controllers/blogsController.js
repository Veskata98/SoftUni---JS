const blogsController = require('express').Router();

const { hasUser } = require('../middlewares/guards');
const { getUserEmail } = require('../services/authService');
const { createBlog, getBlogs, getBlogById, deleteBlog, updateBlog, followBlog } = require('../services/blogService');
const { errorParser } = require('../utils/errorParser');

blogsController.get('/', async (req, res) => {
    const blogs = await getBlogs();

    res.render('blogs', { title: 'Blogs - Mind Blog', blogs });
});

blogsController.get('/create', hasUser, async (req, res) => {
    res.render('createBlog', { title: 'Create Blog - Mind Blog' });
});

blogsController.post('/create', hasUser, async (req, res) => {
    try {
        const userId = req.user.userId;

        Object.values(req.body).forEach((x) => {
            if (x == '') {
                throw new Error('All fields are required');
            }
        });

        await createBlog(userId, req.body);

        res.redirect('/blogs');
    } catch (error) {
        const errorMessages = errorParser(error);
        res.render('createBlog', { title: 'Create Blog - Mind Blog', errorMessages, blog: { ...req.body } });
    }
});

blogsController.get('/details/:id', async (req, res) => {
    const blogId = req.params.id;
    const userId = req.user?.userId;

    const blog = await getBlogById(blogId);

    blog.ownerEmail = await getUserEmail(blog.owner);

    if (blog.followers.length == 0) {
        blog.followers = 0;
    } else {
        const folks = [];
        blog.followers.map((x) => folks.push(x.username));
        blog.followers = folks.join(', ');
    }

    let isOwner;
    let isFollowed;

    if (userId == blog.owner) {
        isOwner = true;
    } else {
        isOwner = false;
        if (blog.followers.includes(userId)) {
            isFollowed = true;
        }
    }

    res.render('blogDetails', { title: `${blog.title} - Mind Blog`, blog, isOwner, isFollowed });
});

blogsController.get('/edit/:id', hasUser, async (req, res) => {
    const blogId = req.params.id;
    const userId = req.user.userId;

    const blog = await getBlogById(blogId);

    if (userId == blog.owner) {
        res.render('editBlog', { title: `Edit ${blog.title} - Mind Blog`, blog, blogId });
    } else {
        res.redirect('/');
    }
});

blogsController.post('/edit/:id', hasUser, async (req, res) => {
    const blogId = req.params.id;
    const userId = req.user.userId;

    const blog = await getBlogById(blogId);

    if (userId == blog.owner) {
        try {
            Object.values(req.body).forEach((x) => {
                if (x == '') {
                    throw new Error('All fields are required');
                }
            });

            await updateBlog(blogId, req.body);
            res.redirect(`/blogs/details/${blogId}`);
        } catch (error) {
            const errorMessages = errorParser(error);
            res.render('editBlog', {
                title: 'Edit Blog - Mind Blog',
                errorMessages,
                blog: { ...req.body },
                blogId,
            });
        }
    } else {
        res.redirect('/');
    }
});

blogsController.get('/delete/:id', hasUser, async (req, res) => {
    const blogId = req.params.id;
    const userId = req.user.userId;

    const blog = await getBlogById(blogId);

    if (userId == blog.owner) {
        await deleteBlog(blogId);
    }

    res.redirect('/blogs');
});

blogsController.get('/follow/:id', hasUser, async (req, res) => {
    const blogId = req.params.id;
    const userId = req.user.userId;

    const blog = await getBlogById(blogId);

    if (userId != blog.owner && !blog.followers.includes(userId.toString())) {
        await followBlog(blogId, userId);
    }

    res.redirect(`/blogs/details/${blogId}`);
});

module.exports = blogsController;
