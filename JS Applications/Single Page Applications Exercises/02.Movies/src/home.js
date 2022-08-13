import { renderDetails } from './details.js';
import { showSection, updateNav } from './utils.js';

const section = document.getElementById('home-page');
const movieContainer = document.querySelector('.card-deck.d-flex.justify-content-center');

export function renderHome() {
    updateNav();
    showSection(section);
    renderMovies();
}

async function getMovies() {
    movieContainer.replaceChildren();
    const res = await fetch('http://localhost:3030/data/movies');
    const movies = await res.json();

    return movies;
}

async function renderMovies() {
    const movies = await getMovies();

    const fragment = document.createDocumentFragment();

    movies.forEach((movie) => {
        const divMovie = document.createElement('div');
        divMovie.classList = 'card mb-4';
        divMovie.innerHTML = `
        <img class="card-img-top" src="${movie.img}"
            alt="Card image cap" width="400">
        <div class="card-body">
            <h4 class="card-title">${movie.title}</h4>
        </div>
        <div class="card-footer">
            <a href="/details">
                <button type="button" class="btn btn-info" id="${movie._id}">Details</button>
            </a>
        </div>
        `;
        fragment.appendChild(divMovie);
    });

    movieContainer.appendChild(fragment);
}

movieContainer.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.tagName == 'BUTTON') {
        renderDetails(e.target.id);
    }
});
