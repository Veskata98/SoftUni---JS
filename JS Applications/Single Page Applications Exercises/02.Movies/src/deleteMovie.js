import { renderHome } from './home.js';

export function deleteMovie(movie) {
    if (window.confirm(`Are you sure you want to delete ${movie.title}`)) {
        sendDelHttp(movie._id);
    }
}

async function sendDelHttp(id) {
    const token = JSON.parse(localStorage.getItem('user')).accessToken;
    await fetch(`http://localhost:3030/data/movies/${id}`, {
        method: 'DELETE',
        headers: { 'X-Authorization': token },
    });
    alert('Successful deleted movie');
    renderHome();
}
