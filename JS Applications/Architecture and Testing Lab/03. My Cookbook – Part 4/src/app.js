import { setActiveClass } from './utils.js';
import { updateAuth } from './updateAuth.js';
import { home } from './pages/home.js';
import { catalog } from './pages/catalog.js';
import { create } from './pages/create.js';
import { login } from './pages/login.js';
import { logout } from './pages/logout.js';
import { register } from './pages/register.js';

updateAuth();
home();

const routes = {
    '/': home,
    '/catalog': catalog,
    '/create': create,
    '/login': login,
    '/logout': logout,
    '/register': register,
};

const header = document.querySelector('header');

header.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.tagName == 'A') {
        setActiveClass(e.target);

        const pathName = new URL(e.target.href).pathname;

        const view = routes[pathName];

        if (typeof view == 'function') {
            view();
        }
    }
});

document.querySelector('section.home > footer a').addEventListener('click', (e) => {
    e.preventDefault();
    catalog();
});
