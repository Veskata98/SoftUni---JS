import * as api from './api.js';

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
};

export async function loginUser(email, password) {
    const user = await api.post(endpoints.login, { email, password });
    localStorage.setItem('user', JSON.stringify(user));
}

export async function registerUser(email, password) {
    const user = await api.post(endpoints.register, { email, password });
    localStorage.setItem('user', JSON.stringify(user));
}

export async function logoutUser() {
    api.get(endpoints.logout);
    localStorage.removeItem('user');
}
