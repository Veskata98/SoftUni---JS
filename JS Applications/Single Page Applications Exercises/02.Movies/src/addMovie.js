import { renderHome } from './home.js';
import { showSection } from './utils.js';

const section = document.getElementById('add-movie');
const form = section.querySelector('form');

export function addMovie() {
    showSection(section);
}

form.addEventListener('submit', getMovieInfo);

function getMovieInfo(e) {
    e.preventDefault();
    const formData = new FormData(form);

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');

    postMovie(title, description, img);
}

async function postMovie(title, description, img) {
    if (title != '' && description != '' && img != '') {
        const token = JSON.parse(localStorage.getItem('user')).accessToken;
        await fetch('http://localhost:3030/data/movies/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Authorization': token },
            body: JSON.stringify({ title, description, img }),
        });

        form.reset();
        alert('Successful added movie');
        renderHome();
    }
}
