export const authMiddleware = (ctx, next) => {
    let user = localStorage.getItem('user');

    ctx.isAuthenticated = Boolean(user);

    if (user) {
        ctx.userId = JSON.parse(user)._id;
    }

    next();
};
