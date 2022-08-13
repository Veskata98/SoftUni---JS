import { updateAuth } from '../utils.js';

const registerSection = document.querySelector('.register');
const form = registerSection.querySelector('form');

export function renderRegister() {
    registerSection.style.display = 'block';
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    if (password === rePass && password.length > 0) {
        try {
            const res = await fetch('http://localhost:3030/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const user = await res.json();

            localStorage.setItem('user', JSON.stringify(user));
            alert('Successful Register');
            updateAuth();
        } catch (error) {
            alert(error);
        }
    } else if (password.length > 0) {
        alert('Password do not match');
    }
});
