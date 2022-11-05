const authController = require('express').Router();

const { body, validationResult } = require('express-validator');
const { isGuest, hasUser } = require('../middlewares/guards');
const { login, register } = require('../services/authService');
const { errorParser } = require('../utils/errorParser');

//LOGIN
/////////////////////////////

authController.get('/login', isGuest, (req, res) => {
    res.render('login', { title: 'Login - Mind Blog' });
});

authController.post('/login', isGuest, async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        if (email == '' || password == '') {
            throw new Error('All fields are required');
        }

        const userData = await login(email, password);
        attachToken(req, res, userData);

        res.redirect('/');
    } catch (error) {
        const errorMessages = errorParser(error);
        res.render('login', { title: 'Login - Mind Blog', errorMessages, email });
    }
});

//REGISTER
/////////////////////////////

authController.get('/register', isGuest, (req, res) => {
    res.render('register', { title: 'Register - Mind Blog' });
});

authController.post(
    '/register',
    isGuest,
    body('password').isLength({ min: 4 }).withMessage('Password must be atleast 4 characters long'),
    async (req, res) => {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const repass = req.body.repeatPassword;

        try {
            if (username == '' || email == '' || password == '') {
                throw new Error('All fields are required');
            }

            if (password !== repass) {
                throw new Error('Password do not match');
            }

            const errors = validationResult(req)
                .array()
                .map((x) => x.msg)
                .join('\n');

            if (errors) {
                throw new Error(errors);
            }

            const userData = await register(username, email, password);
            attachToken(req, res, userData);

            res.redirect('/');
        } catch (error) {
            const errorMessages = errorParser(error);
            res.render('register', { title: 'Register - Mind Blog', errorMessages, username, email });
        }
    },
);

//LOGOUT
/////////////////////////////

authController.get('/logout', hasUser, (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

//TOKEN ATTACHMENT
/////////////////////////////

const attachToken = (req, res, data) => {
    const token = req.signJwt(data);
    res.cookie('token', token);
};

module.exports = authController;
