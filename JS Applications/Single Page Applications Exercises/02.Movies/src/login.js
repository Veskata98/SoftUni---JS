import { renderHome } from './home.js';
import { showSection, updateNav } from './utils.js';

const section = document.getElementById('form-login');
const form = section.querySelector('form');

export function renderLogin() {
    showSection(section);
    section.addEventListener('submit', loginSubmit);
}

function loginSubmit(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    if (email != '' && password != '') {
        loginUser(email, password);
    }
}

async function loginUser(email, password) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    };

    try {
        const res = await fetch('http://localhost:3030/users/login', options);
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }

        const user = await res.json();
        localStorage.setItem('user', JSON.stringify(user));

        successLogin();
    } catch (error) {
        alert(error);
    }
}

function successLogin() {
    alert('Successful login');
    form.reset();
    updateNav();
    renderHome();
}
