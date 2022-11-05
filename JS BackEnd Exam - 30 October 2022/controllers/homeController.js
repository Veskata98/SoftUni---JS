const { getLatest } = require('../services/blogService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    const blogs = await getLatest();
    res.render('home', { title: 'Mind Blog', blogs });
});

module.exports = homeController;
