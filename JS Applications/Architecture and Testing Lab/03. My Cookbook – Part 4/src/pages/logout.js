import { updateAuth } from '../updateAuth.js';
import { home } from './home.js';

export function logout() {
    localStorage.removeItem('user');
    alert('Successful Logged Out');
    updateAuth();
    home();
}
