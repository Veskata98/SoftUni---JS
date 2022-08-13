import { renderHome } from './pages/home.js';

export function updateAuth() {
    const userNavigation = document.getElementById('user');
    const guestNavigation = document.getElementById('guest');

    const user = localStorage.getItem('user');

    if (user) {
        userNavigation.style.display = 'inline-block';
        guestNavigation.style.display = 'none';
        renderHome();
    } else {
        userNavigation.style.display = 'none';
        guestNavigation.style.display = 'inline-block';
        renderHome();
    }
}

export function setActiveClass(element) {
    document.querySelector('.active').classList.remove('active');
    element.classList.add('active');
}

export function hideAllContent() {
    [...document.querySelectorAll('section')].forEach((el) => (el.style.display = 'none'));
}

export function loading(element) {
    element.innerHTML = '<h1 style="color: white">Loading...</h1>';
}
