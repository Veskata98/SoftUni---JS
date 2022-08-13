import { renderPosts } from './renderPosts.js';
import { router } from './router.js';

renderPosts();

const form = document.querySelector('form');
form.addEventListener('submit', submitPost);

async function submitPost(e) {
    e.preventDefault();

    let buttonClicked = document.activeElement.textContent;

    if (buttonClicked == 'Post') {
        const formData = new FormData(form);

        const topicName = formData.get('topicName');
        const username = formData.get('username');
        const postText = formData.get('postText');
        const date = new Date();

        if (topicName != '' && username != '' && postText != '') {
            await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topicName, username, postText, date }),
            });

            renderPosts();
            form.reset();
        }
    } else {
        form.reset();
    }
}

document.querySelector('.topic-container').addEventListener('click', (e) => {
    e.preventDefault();
    const clickedElement = e.target;
    if (clickedElement.parentNode.tagName == 'A') {
        const anchor = clickedElement.parentNode;
        const url = new URL(anchor);

        router(url.pathname, anchor.id);
    }
});

document.getElementById('home').addEventListener('click', (e) => {
    e.preventDefault();
    const main = document.querySelector('div.container > main');
    main.querySelectorAll('main > div').forEach((x) => (x.style.display = 'block'));
    main.querySelectorAll('section').forEach((x) => x.remove());
});
