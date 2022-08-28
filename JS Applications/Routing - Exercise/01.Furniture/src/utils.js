import { html, render } from '../node_modules/lit-html/lit-html.js';

const main = document.querySelector('main');

const userNav = () => html`
    <a id="catalogLink" href="/" class="active">Dashboard</a>
    <div id="user">
        <a id="createLink" href="/create">Create Furniture</a>
        <a id="profileLink" href="/my-furniture">My Publications</a>
        <a id="logoutBtn" href="/logout">Logout</a>
    </div>
`;

const guestNav = () => html`
    <a id="catalogLink" href="/" class="active">Dashboard</a>
    <div id="guest">
        <a id="loginLink" href="/login">Login</a>
        <a id="registerLink" href="/register">Register</a>
    </div>
`;

export const updateNav = (focus = '/') => {
    const user = localStorage.getItem('user');
    const nav = document.querySelector('nav');

    if (user) {
        render(userNav(), nav);
    } else {
        render(guestNav(), nav);
    }

    nav.querySelector('.active').classList.remove('active');

    if (focus == '/') {
        nav.querySelector('#catalogLink').classList.add('active');
    } else {
        nav.querySelector(`a[href="${focus}"]`).classList.add('active');
    }
};

export const mainElement = () => {
    return main;
};

export const loading = () =>
    html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Loading...</h1>
            </div>
        </div>
    `;
