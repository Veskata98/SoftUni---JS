import { renderHome } from './home.js';
import { updateNav } from './utils.js';

export function logout() {
    localStorage.removeItem('user');
    alert('Logged out');
    updateNav();
    renderHome();
}
