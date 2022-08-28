import { registerUser } from '../api.js';
import { viewSection } from '../render.js';
import { updateAuth } from '../updateAuth.js';
import { getFormData } from '../utils.js';
import { home } from './home.js';

const section = document.querySelector('.register');
const form = section.querySelector('form');

export function register() {
    viewSection(section);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const [email, password, rePass] = getFormData(form, ['email', 'password', 'rePass']);

    if (password === rePass && password.length > 0) {
        const user = await registerUser(email, password);

        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            alert('Successful Register');
            form.reset();
            updateAuth();
            home();
        }
    } else if (password.length > 0) {
        alert('Password do not match');
    }
});
