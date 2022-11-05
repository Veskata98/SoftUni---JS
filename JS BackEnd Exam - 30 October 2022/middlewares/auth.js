const jwt = require('jsonwebtoken');

module.exports = (jwtSecret) => (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        try {
            const userData = jwt.verify(token, jwtSecret);
            req.user = userData;
        } catch (error) {
            res.clearCookie('token');
            return res.redirect('/auth/login');
        }
    }

    req.signJwt = (data) => jwt.sign(data, jwtSecret);

    next();
};
