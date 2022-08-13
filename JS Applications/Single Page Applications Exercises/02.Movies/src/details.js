import { deleteMovie } from './deleteMovie.js';
import { likeMovie } from './likeMovie.js';
import { updateMovie } from './updateMovie.js';
import { showSection } from './utils.js';

const section = document.getElementById('movie-example');
let movie;

const editPaths = {
    '/delete': deleteMovie,
    '/edit': updateMovie,
    '/like': likeMovie,
};

export function renderDetails(id) {
    showSection(section);
    section.replaceChildren();
    renderMovieDetails(id);
}

async function getMovie(id) {
    section.innerHTML = '<h2>Loading...</h2>';
    try {
        const res = await fetch(`http://localhost:3030/data/movies/${id}`);
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }

        const movie = await res.json();

        return movie;
    } catch (error) {
        alert(error);
    }
}

async function renderMovieDetails(id) {
    movie = await getMovie(id);

    const divMovie = document.createElement('div');
    divMovie.classList.add('container');
    divMovie.innerHTML = `
    <div class="row bg-light text-dark">
        <h1>Movie title: ${movie.title}</h1>

        <div class="col-md-8">
            <img class="img-thumbnail" src="${movie.img}"
                alt="Movie">
        </div>
        <div class="col-md-4 text-center">
            <h3 class="my-3 ">Movie Description</h3>
            <p>${movie.description}</p>
            ${await detailsButtons(movie)}
        </div>
    </div>
    `;
    section.replaceChildren();
    section.appendChild(divMovie);
}

async function detailsButtons(movie) {
    const user = JSON.parse(localStorage.getItem('user'));

    const likes = await getLikes(movie);

    if (user) {
        if (user._id == movie._ownerId) {
            return `            
            <a class="btn btn-danger" href="/delete">Delete</a>
            <a class="btn btn-warning" href="/edit">Edit</a>
            <span class="enrolled-span" id="likes">Liked ${likes}</span>`;
        } else {
            if (await ownLike(movie._id, user._id)) {
                return `
                    <span class="enrolled-span" id="likes">Liked ${likes}</span>
                    `;
            } else {
                return `
                    <a class="btn btn-primary" href="/like">Like</a>
                    <span class="enrolled-span" id="likes">Liked ${likes}</span>
                    `;
            }
        }
    } else {
        return `<span class="enrolled-span" id="likes">Liked ${likes}</span>`;
    }
}

async function getLikes(movie) {
    const res = await fetch(
        `http://localhost:3030/data/likes?where=movieId%3D%22${movie._id}%22&distinct=_ownerId&count`
    );
    const likes = await res.json();

    return likes;
}

section.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.tagName == 'A') {
        const url = new URL(e.target.href);
        if (typeof editPaths[url.pathname] == 'function') {
            editPaths[url.pathname](movie);
        }
    }
});

async function ownLike(movieId, userId) {
    const res = await fetch(
        `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`
    );
    const data = await res.json();
    if (data.length > 0) {
        return true;
    } else {
        return false;
    }
}
