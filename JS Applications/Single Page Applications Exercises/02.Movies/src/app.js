import { addMovie } from './addMovie.js';
import { renderHome } from './home.js';
import { renderLogin } from './login.js';
import { logout } from './logout.js';
import { renderRegister } from './register.js';
import { updateNav } from './utils.js';

updateNav();
renderHome();

const routes = {
    '/': renderHome,
    '/login': renderLogin,
    '/logout': logout,
    '/register': renderRegister,
    '/add': addMovie,
};

document.querySelector('nav').addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.tagName == 'A' && e.target.href) {
        const pathName = new URL(e.target.href).pathname;

        const view = routes[pathName];
        if (typeof view == 'function') {
            view();
        }
    }
});

document.getElementById('addMovieBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const pathName = new URL(e.target.href).pathname;

    const view = routes[pathName];
    if (typeof view == 'function') {
        view();
    }
});
