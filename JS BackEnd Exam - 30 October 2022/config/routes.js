const homeController = require('../controllers/homeController');
const blogsController = require('../controllers/blogsController');

const authController = require('../controllers/authController');

const errorController = require('../controllers/errorControllers');

module.exports = (app) => {
    app.use(homeController);
    app.use('/blogs', blogsController);

    app.use('/auth', authController);

    app.use('*', errorController);
};
