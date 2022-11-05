const express = require('express');
const handlebars = require('express-handlebars').create({ extname: '.hbs' });
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');
const userNav = require('../middlewares/userNav');
const trimBody = require('../middlewares/trimBody');

const jwtSecret = '823u8F$943ru4398U$yr734g9fewasmcxznvbk';

module.exports = (app) => {
    app.engine('hbs', handlebars.engine);
    app.set('view engine', 'hbs');

    app.use(express.urlencoded({ extended: true }));

    app.use(cookieParser());
    app.use(auth(jwtSecret));
    app.use(userNav());
    app.use(trimBody());

    app.use('/static', express.static('static'));
    // app.use('/favicon.ico', express.static('images/favicon.ico'));
};
