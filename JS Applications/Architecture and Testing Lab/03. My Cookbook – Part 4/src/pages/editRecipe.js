import { updateRecipe } from '../api.js';
import { viewSection } from '../render.js';
import { details } from './details.js';
import { getFormData } from '../utils.js';

const section = document.querySelector('.edit');
const form = section.querySelector('form');
const inputFields = [...form.querySelectorAll('input, textarea')].slice(0, -1);
let recipeId;

export function editRecipe(recipe) {
    recipeId = recipe._id;
    viewSection(section);
    fillEditForm(recipe);
}

function fillEditForm(recipe) {
    inputFields[0].value = recipe.name;
    inputFields[1].value = recipe.img;
    inputFields[2].value = recipe.ingredients.join('\n').trim();
    inputFields[3].value = recipe.steps.join('\n').trim();
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const [name, img, ingredients, steps] = getFormData(form, ['name', 'img', 'ingredients', 'steps']);

    await updateRecipe(recipeId, name, img, ingredients, steps);

    form.reset();
    alert('Successfully edited');
    details(recipeId);
});
