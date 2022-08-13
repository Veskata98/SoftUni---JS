import { renderDetails } from './details.js';
import { setActiveClass, hideAllContent, loading } from '../utils.js';

const homeSection = document.querySelector('.home');

const baseUrl = 'http://localhost:3030/data/recipes';

export function renderHome() {
    hideAllContent();

    homeSection.style.display = 'block';

    const catalogLink = document.querySelector('nav.navigation a:first-child');
    setActiveClass(catalogLink);

    (async function () {
        loading(homeSection);
        const res = await fetch(baseUrl);
        const data = await res.json();
        renderRecipes(data);
    })();
}

function renderRecipes(data) {
    const fragment = document.createDocumentFragment();
    homeSection.innerHTML = '';
    Object.values(data).map((x) => {
        const article = document.createElement('article');
        article.classList.add('preview');

        article.innerHTML = `   
        <div class="title">
            <h2>${x.name}</h2>
        </div>
        <div class="small">
            <img src="${x.img}">
        </div>
        `;
        fragment.appendChild(article);
        article.addEventListener('click', async (e) => {
            renderDetails(x._id);
        });
    });
    homeSection.appendChild(fragment);
}

// home();
