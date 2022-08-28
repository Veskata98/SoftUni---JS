import { viewSection } from '../render.js';
import { loadingScreen } from '../utils.js';
import { details } from './details.js';

const section = document.querySelector('.home');
const recentRecipes = section.querySelector('.recent-recipes');

export function home() {
    viewSection(section);
    loadingScreen(recentRecipes);
    get3RecentRecipes();
}

async function get3RecentRecipes() {
    const res = await fetch(
        'http://localhost:3030/data/recipes?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc&pageSize=3'
    );
    const recipes = await res.json();

    recentRecipes.replaceChildren();

    const fragment = document.createDocumentFragment();
    recipes.forEach((recipe, index) => {
        const article = document.createElement('article');
        article.setAttribute('id', recipe._id);
        article.classList.add('recent');
        article.innerHTML = `
                <div class="recent-preview"><img src="${recipe.img}"></div>
                <div class="recent-title">${recipe.name}</div>
        `;
        fragment.appendChild(article);
        if (index !== 2) {
            const divSpace = document.createElement('div');
            divSpace.classList.add('recent-space');
            fragment.appendChild(divSpace);
        }
    });
    recentRecipes.appendChild(fragment);

    recentRecipes.addEventListener('click', (e) => {
        if (e.target.parentNode.parentNode.tagName == 'ARTICLE') {
            details(e.target.parentNode.parentNode.id);
        } else if (e.target.parentNode.tagName == 'ARTICLE') {
            details(e.target.parentNode.id);
        }
    });
}
