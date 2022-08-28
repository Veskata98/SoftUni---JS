import { details } from './details.js';
import { loadingScreen } from '../utils.js';
import { viewSection } from '../render.js';
import { getRecipes, getRecipesCount } from '../api.js';

const section = document.querySelector('.catalog');
let offset = 0;
let pageCount = 1;

export function catalog() {
    viewSection(section);
    offset = 0;
    pageCount = 1;
    renderRecipes();
}

async function renderRecipes(page = 1) {
    loadingScreen(section);
    offset = (page - 1) * 5;

    const recipes = await getRecipes(offset);
    const count = await getRecipesCount();

    const pages = Math.ceil(count / 5);

    createRecipes(recipes, page, pages);
}

function createRecipes(recipes, page, pages) {
    section.innerHTML = '';
    const fragment = document.createDocumentFragment();

    const headerPager = document.createElement('header');
    headerPager.classList.add('section-title');
    headerPager.textContent = `Page ${page} of ${pages}`;

    const footerPager = document.createElement('footer');
    footerPager.classList.add('section-title');
    footerPager.textContent = `Page ${page} of ${pages}`;

    const linkBefore = document.createElement('a');
    const linkAfter = document.createElement('a');

    if (page > 1) {
        linkBefore.href = '/prev';
        linkBefore.classList.add('pager');
        linkBefore.text = 'Prev';
        headerPager.appendChild(linkBefore);
        footerPager.appendChild(linkBefore.cloneNode(true));
    }
    if (page < pages) {
        linkAfter.href = '/next';
        linkAfter.classList.add('pager');
        linkAfter.text = 'Next';
        headerPager.appendChild(linkAfter);
        footerPager.appendChild(linkAfter.cloneNode(true));
    }

    fragment.appendChild(headerPager);

    Object.values(recipes).map((x) => {
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
            details(x._id);
        });
    });

    fragment.appendChild(footerPager);
    section.appendChild(fragment);
}

section.addEventListener('click', async (e) => {
    if (e.target.tagName == 'A') {
        e.preventDefault();
        if (e.target.text == 'Next') {
            await renderRecipes(++pageCount);
        } else {
            await renderRecipes(--pageCount);
        }
    }
});
