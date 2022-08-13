import { updateAuth } from '../utils.js';

const loginSection = document.querySelector('.login');
const form = loginSection.querySelector('form');

export async function renderLogin() {
    loginSection.style.display = 'block';
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');

    const res = await fetch('http://localhost:3030/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    const user = await res.json();

    localStorage.setItem('user', JSON.stringify(user));
    alert('Successful Login');
    updateAuth();
});
