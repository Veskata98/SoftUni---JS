import { renderDetails } from './details.js';
import { getFormData, showSection } from './utils.js';

const section = document.getElementById('edit-movie');
const form = section.querySelector('form');
let id;

export function updateMovie(movie) {
    showSection(section);
    fillForm(movie);
    id = movie._id;
}

function fillForm(movie) {
    form.querySelector('#title').value = movie.title;
    form.querySelector('#editDescription').value = movie.description;
    form.querySelector('#imageUrl').value = movie.img;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('user')).accessToken;

    // const formData = new FormData(form);

    // const title = formData.get('title');
    // const description = formData.get('description');
    // const img = formData.get('imageUrl');

    const [title, description, img] = getFormData(form, ['title', 'description', 'imageUrl']);

    if (title != '' && description != '' && img != '') {
        await fetch(`http://localhost:3030/data/movies/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'X-Authorization': token },
            body: JSON.stringify({ title, description, img }),
        });

        form.reset();
        alert('Successful updated movie');
        renderDetails(id);
    }
});
