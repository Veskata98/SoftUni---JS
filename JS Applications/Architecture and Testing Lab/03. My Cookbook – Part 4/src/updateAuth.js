import { getUser } from './utils.js';

const userNavigation = document.getElementById('user');
const guestNavigation = document.getElementById('guest');

export function updateAuth() {
    if (getUser()) {
        userNavigation.style.display = 'inline-block';
        guestNavigation.style.display = 'none';
    } else {
        userNavigation.style.display = 'none';
        guestNavigation.style.display = 'inline-block';
    }
}
