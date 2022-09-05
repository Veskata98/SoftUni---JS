import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as recipeService from '../services/recipeService.js';

const editRecipeHandler = (ctx, id) => {
    ctx.page.redirect(`/edit/${id}`);
};

const deleteRecipeHandler = (ctx, id) => {
    const choice = confirm('Are you sure you want to delete this recipe?');
    if (choice) {
        recipeService.del(id);
        ctx.page.redirect('/');
    }
};

const articleTemplate = (ctx, recipe) => html`
    <article>
        <h2>${recipe.name}</h2>
        <div class="band">
            <div class="thumb">
                <img src="/${recipe.img}" />
            </div>
            <div class="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    ${recipe.ingredients.map(
                        (i) =>
                            html`
                                <li>${i}</li>
                            `
                    )}
                </ul>
            </div>
        </div>
        <div class="description">
            <h3>Preparation:</h3>
            ${recipe.steps.map(
                (s) =>
                    html`
                        <p>${s}</p>
                    `
            )}
        </div>
        ${ctx.userId == recipe._ownerId
            ? html`
                  <div class="controls">
                      <button @click=${() => editRecipeHandler(ctx, recipe._id)}>✎ Edit</button>
                      <button @click=${() => deleteRecipeHandler(ctx, recipe._id)}>✖ Delete</button>
                  </div>
              `
            : nothing}
    </article>
`;

export const detailsView = async (ctx) => {
    const recipe = await recipeService.getOne(ctx.params.recipeId);

    ctx.render(articleTemplate(ctx, recipe));
};
