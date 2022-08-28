import { getRecipe } from '../api.js';
import { viewSection } from '../render.js';
import { getUser, loadingScreen } from '../utils.js';
import { editRecipe } from './editRecipe.js';
import { deleteRecipe } from './deleteRecipe.js';

const section = document.querySelector('.details');

export function details(id) {
    viewSection(section);
    renderRecipeDetails(id);
}

async function renderRecipeDetails(id) {
    loadingScreen(section);
    const recipe = await getRecipe(id);
    createDetailsArticle(recipe);
}

function createDetailsArticle(recipe) {
    section.innerHTML = '';
    const user = getUser();

    const article = document.createElement('article');
    article.innerHTML = `
        <h2>${recipe.name}</h2>
        <div class="band">
        <div class="thumb">
            <img src="${recipe.img}">
        </div>
        <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul>
                ${recipe.ingredients.map((x) => `<li>${x}</li>`).join('')}
            </ul>
        </div>
        </div>
        <div class="description">
        <h3>Preparation:</h3>
            ${recipe.steps.map((x) => `<p>${x}</p>`).join('')}
        </div>`;

    section.appendChild(article);

    if (user && recipe._ownerId === user._id) {
        article.innerHTML += `
        <div class="controls">
            <button id="edit">\u270E Edit</button>
            <button id="delete">\u2716 Delete</button>
        </div>
        `;

        section.querySelector('#edit').addEventListener('click', (e) => {
            e.preventDefault();
            editRecipe(recipe);
        });

        section.querySelector('#delete').addEventListener('click', (e) => {
            e.preventDefault();
            deleteRecipe(recipe._id);
        });
    }
}
