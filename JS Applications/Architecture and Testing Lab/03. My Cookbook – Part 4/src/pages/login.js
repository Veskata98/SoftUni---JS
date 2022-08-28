import { updateAuth } from '../updateAuth.js';
import { loginUser } from '../api.js';
import { viewSection } from '../render.js';
import { getFormData } from '../utils.js';
import { home } from './home.js';

const section = document.querySelector('.login');
const form = section.querySelector('form');

export function login() {
    viewSection(section);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const [email, password] = getFormData(form, ['email', 'password']);

    const user = await loginUser(email, password);

    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        alert('Successful Login');
        form.reset();
        updateAuth();
        home();
    }
});
