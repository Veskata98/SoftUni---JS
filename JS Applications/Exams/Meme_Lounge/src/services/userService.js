import * as api from './api.js';
import { clearUser, setUser } from '../utils/userUtils.js';

const baseUrl = 'http://localhost:3030/users';

const endpoints = {
    login: '/login',
    register: '/register',
    logout: '/logout',
};

export const login = async (data) => {
    const user = await api.post(baseUrl + endpoints.login, data);

    if (typeof user == 'string') {
        const errorMsg = user;
        return errorMsg;
    } else {
        setUser(user);
        return;
    }
};

export const register = async (data) => {
    const user = await api.post(baseUrl + endpoints.register, data);
    setUser(user);
};

export const logout = async () => {
    await api.get(baseUrl + endpoints.logout);
    clearUser();
};
