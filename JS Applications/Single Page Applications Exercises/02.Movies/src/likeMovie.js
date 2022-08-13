import { renderDetails } from './details.js';
const section = document.getElementById('movie-example');

export function likeMovie(movie) {
    sendLikeHttp(movie._id);
}

async function sendLikeHttp(id) {
    const token = JSON.parse(localStorage.getItem('user')).accessToken;
    await fetch('http://localhost:3030/data/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Authorization': token },
        body: JSON.stringify({ movieId: id }),
    });
    section.querySelector('a').classList.add('hidden');
    section.querySelector('#likes').textContent = `Liked ${await getLikes(id)}`;
}

async function getLikes(id) {
    const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    const likes = await res.json();

    return likes;
}
