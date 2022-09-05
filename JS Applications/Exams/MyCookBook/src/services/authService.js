import * as api from './apiService.js';

const baseUrl = 'http://localhost:3030/users';

const endpoints = {
    login: '/login',
    register: '/register',
    logout: '/logout',
};

const saveUser = (user) => localStorage.setItem('user', JSON.stringify(user));

export const login = async (ctx, email, password) => {
    const user = await api.post(baseUrl + endpoints.login, { email, password });
    saveUser(user);
    ctx.page.redirect('/');
};

export const register = async (ctx, email, password) => {
    const user = await api.post(baseUrl + endpoints.register, { email, password });
    saveUser(user);
    ctx.page.redirect('/');
};

export const logout = async (ctx) => {
    await api.get(baseUrl + endpoints.logout);
    ctx.page.redirect('/');
};
