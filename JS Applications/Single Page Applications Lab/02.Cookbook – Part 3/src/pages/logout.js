import { updateAuth } from '../utils.js';

export function logout() {
    localStorage.removeItem('user');
    alert('Successful Logged Out');
    updateAuth();
}
