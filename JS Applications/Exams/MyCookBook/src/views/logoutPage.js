import * as api from '../services/authService.js';

export const logoutView = async (ctx) => {
    await api.logout(ctx);
    localStorage.removeItem('user');
};
