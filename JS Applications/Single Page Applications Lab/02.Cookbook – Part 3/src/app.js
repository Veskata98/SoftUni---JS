import { router } from './router.js';
import { updateAuth, setActiveClass } from './utils.js';

updateAuth();
router('/');

const nagivationElement = document.querySelector('.navigation');

nagivationElement.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.tagName == 'A') {
        setActiveClass(e.target);

        const pathName = new URL(e.target.href).pathname;
        router(pathName);
    }
});
