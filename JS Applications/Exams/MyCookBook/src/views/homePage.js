import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as recipeService from '../services/recipeService.js';

let context = null;

const detailsHandler = (id) => {
    context.page.redirect(`/details/${id}`);
};

const recipeArticle = (recipe, i) => html`
    <article @click=${()=> detailsHandler(recipe._id)} class="recent">
        <div class="recent-preview"><img src=${recipe.img} /></div>
        <div class="recent-title">${recipe.name}</div>
    </article>
    ${i < 2 ? html`<div class="recent-space">
        </div>` : nothing}
`;

const homeTemplate = (recipes) => html`
    <section id="home">
        <div class="hero">
            <h2>Welcome to My Cookbook</h2>
        </div>
        <header class="section-title">Recently added recipes</header>
        <div class="recent-recipes">
            ${recipes.map(recipeArticle)}
        </div>
        <footer class="section-title">
            <p>
                Browse all recipes in the
                <a href="/catalog">Catalog</a>
            </p>
        </footer>
    </section>
`;

export const homeView = async (ctx) => {
    context = ctx;
    const recipes = await recipeService.getLastThree();

    ctx.render(homeTemplate(recipes));
};




