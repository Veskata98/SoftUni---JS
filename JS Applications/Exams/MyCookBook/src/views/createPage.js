import { html } from '../../node_modules/lit-html/lit-html.js';
import * as recipeService from '../services/recipeService.js';

const createHandler = async (e, ctx) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get('name');
    const img = formData.get('img');
    const ingredients = formData.get('ingredients').split('\n');
    const steps = formData.get('steps').split('\n');

    if (name.length != 0 && img.length != 0 && ingredients.length != 0 && steps.length != 0) {
        await recipeService.create({ name, img, ingredients, steps });
        ctx.page.redirect('/');
    }
};

const createTemplate = (ctx) => html`
    <article>
        <h2>New Recipe</h2>
        <form @submit=${(e) => createHandler(e, ctx)}>
            <label>
                Name:
                <input type="text" name="name" placeholder="Recipe name" />
            </label>
            <label>
                Image:
                <input type="text" name="img" placeholder="Image URL" />
            </label>
            <label class="ml">
                Ingredients:
                <textarea name="ingredients" placeholder="Enter ingredients on separate lines"></textarea>
            </label>
            <label class="ml">
                Preparation:
                <textarea name="steps" placeholder="Enter preparation steps on separate lines"></textarea>
            </label>
            <input type="submit" value="Create Recipe" />
        </form>
    </article>
`;

export const createView = (ctx) => {
    ctx.render(createTemplate(ctx));
};
