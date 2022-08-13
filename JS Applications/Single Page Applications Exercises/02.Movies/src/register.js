import { renderHome } from './home.js';
import { showSection, updateNav } from './utils.js';

const section = document.getElementById('form-sign-up');
const form = section.querySelector('form');

export function renderRegister() {
    showSection(section);
    section.addEventListener('submit', registerSubmit);
}

function registerSubmit(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('repeatPassword');

    if (password === repeatPassword && email != '' && password != '') {
        registerUser(email, password);
    } else {
        alert('Password do not match');
    }
}

async function registerUser(email, password) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    };

    try {
        const res = await fetch('http://localhost:3030/users/register', options);
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }

        const user = await res.json();
        localStorage.setItem('user', JSON.stringify(user));

        successRegister();
    } catch (error) {
        alert(error);
    }
}

function successRegister() {
    alert('Successful Register');
    form.reset();
    updateNav();
    renderHome();
}
