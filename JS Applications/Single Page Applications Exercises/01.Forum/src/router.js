import { getAllComments } from './getAllComments.js';
import { getPost } from './getPost.js';

const main = document.querySelector('div.container > main');

export function router(pathname, id) {
    main.querySelectorAll('main > div').forEach((x) => (x.style.display = 'none'));
    getPost(id);
    getAllComments(id);
}
