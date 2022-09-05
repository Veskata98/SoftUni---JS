import { html } from '../../node_modules/lit-html/lit-html.js';
import * as recipeService from '../services/recipeService.js';

const editHandler = async (e, ctx, recipeId) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get('name');
    const img = formData.get('img');
    const ingredients = formData.get('ingredients').split('\n');
    const steps = formData.get('steps').split('\n');

    if (name.length != 0 && img.length != 0 && ingredients.length != 0 && steps.length != 0) {
        await recipeService.update(recipeId, { name, img, ingredients, steps });
        ctx.page.redirect('/');
    }
};

const editRecipeTemplate = (ctx, recipe) => html`
    <article>
        <h2>Edit Recipe</h2>
        <form @submit=${(e) => editHandler(e, ctx, recipe._id)}>
            <label>
                Name:
                <input type="text" name="name" placeholder="Recipe name" value=${recipe.name} />
            </label>
            <label>
                Image:
                <input type="text" name="img" placeholder="Image URL" value=${recipe.img} />
            </label>
            <label class="ml">
                Ingredients:
                <textarea name="ingredients" placeholder="Enter ingredients on separate lines">
${recipe.ingredients.join('\n')}</textarea
                >
            </label>
            <label class="ml">
                Preparation:
                <textarea name="steps" placeholder="Enter preparation steps on separate lines">
${recipe.steps.join('\n')}</textarea
                >
            </label>
            <input type="submit" value="Update Recipe" />
        </form>
    </article>
`;

export const editRecipeView = async (ctx) => {
    const recipeId = ctx.params.recipeId;

    const recipe = await recipeService.getOne(recipeId);

    ctx.render(editRecipeTemplate(ctx, recipe));
};
