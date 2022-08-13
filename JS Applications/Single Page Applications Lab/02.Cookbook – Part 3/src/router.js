import { renderHome } from './pages/home.js';
import { renderLogin } from './pages/login.js';
import { renderRegister } from './pages/register.js';
import { renderCreate } from './pages/create.js';
import { logout } from './pages/logout.js';
import { hideAllContent } from './utils.js';

const routes = {
    '/': renderHome,
    '/login': renderLogin,
    '/register': renderRegister,
    '/create': renderCreate,
    '/logout': logout,
};

export function router(path) {
    hideAllContent();

    if (routes[path]) {
        const renderer = routes[path];
        renderer();
    }
}
