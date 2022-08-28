import { loginUser } from '../api/users.js';

const section = document.getElementById('login');
const form = section.querySelector('form');

let ctx = null;

form.addEventListener('submit', onSubmitLogin);

export function showLogin(context) {
    ctx = context;
    context.showSection(section);
}

async function onSubmitLogin(e) {
    e.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');

    await loginUser(email, password);

    form.reset();
    ctx.updateNav();
    ctx.goTo('/');
}
