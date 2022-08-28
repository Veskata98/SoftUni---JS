import { registerUser } from '../api/users.js';

const section = document.getElementById('register');
const form = section.querySelector('form');

let ctx = null;

form.addEventListener('submit', onSubmitRegister);

export function showRegister(context) {
    ctx = context;
    context.showSection(section);
}

async function onSubmitRegister(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('repeatPassword');
    if (password === repeatPassword && password.length > 0) {
        await registerUser(email, password);

        form.reset();
        ctx.updateNav();
        ctx.goTo('/');
    }
}
