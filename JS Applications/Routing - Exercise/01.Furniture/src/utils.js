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

export const inputCheck = (form) => {
    let flag = false;

    const formData = new FormData(form);

    const make = formData.get('make');
    const model = formData.get('model');
    const year = formData.get('year');
    const description = formData.get('description');
    const price = formData.get('price');
    const img = formData.get('img');
    const material = formData.get('material');

    const makeElement = form.querySelector('#new-make');
    const modelElement = form.querySelector('#new-model');
    const yearElement = form.querySelector('#new-year');
    const descriptionElement = form.querySelector('#new-description');
    const priceElement = form.querySelector('#new-price');
    const imgElement = form.querySelector('#new-image');

    if (make.trim().length > 4) {
        makeElement.classList = 'form-control is-valid';
    } else {
        makeElement.classList = 'form-control is-invalid';
        flag = true;
    }

    if (model.trim().length > 4) {
        modelElement.classList = 'form-control is-valid';
    } else {
        modelElement.classList = 'form-control is-invalid';
        flag = true;
    }

    if (Number(year) > 1950 && Number(year) < 2050) {
        yearElement.classList = 'form-control is-valid';
    } else {
        yearElement.classList = 'form-control is-invalid';
        flag = true;
    }

    if (description.trim().length > 10) {
        descriptionElement.classList = 'form-control is-valid';
    } else {
        descriptionElement.classList = 'form-control is-invalid';
        flag = true;
    }

    if (Number(price) > 0) {
        priceElement.classList = 'form-control is-valid';
    } else {
        priceElement.classList = 'form-control is-invalid';
        flag = true;
    }

    if (img) {
        imgElement.classList = 'form-control is-valid';
    } else {
        imgElement.classList = 'form-control is-invalid';
        flag = true;
    }

    if (!flag) {
        return { make, model, year, description, price, img, material };
    }
};
