import { addRecipe } from '../api.js';
import { viewSection } from '../render.js';
import { getFormData, removeActiveClass } from '../utils.js';
import { catalog } from './catalog.js';

const section = document.querySelector('.create');
const form = section.querySelector('form');

export function create() {
    viewSection(section);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const [name, img, ingredients, steps] = getFormData(form, ['name', 'img', 'ingredients', 'steps']);

    await addRecipe(name, img, ingredients, steps);

    form.reset();
    alert('Successful Added Recipe');
    removeActiveClass();
    catalog();
});
