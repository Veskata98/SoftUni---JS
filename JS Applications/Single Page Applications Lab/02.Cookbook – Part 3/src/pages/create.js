import { renderHome } from './home.js';

const createSection = document.querySelector('.create');
const createForm = createSection.querySelector('form');
const createUrl = 'http://localhost:3030/data/recipes';

export function renderCreate() {
    createSection.style.display = 'block';
}

createForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(createForm);
    const { name, img, ingredients, steps } = Object.fromEntries(data);

    const user = JSON.parse(localStorage.getItem('user'));

    const res = await fetch(createUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': user.accessToken,
        },
        body: JSON.stringify({ name, img, ingredients: ingredients.split('\n'), steps: steps.split('\n') }),
    });
    const responseData = await res.json();

    renderHome();
});
