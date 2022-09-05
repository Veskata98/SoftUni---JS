import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as recipeService from '../services/recipeService.js';

let context = null;

const searchHandler = async (e) => {
    e.preventDefault();
    const queryText = new FormData(e.currentTarget).get('search');

    const result = await recipeService.search(queryText);

    context.page.redirect(`/catalog?search=${queryText}`)
}

const detailsHandler = (id) => {
    context.page.redirect(`/details/${id}`);
};

const recipeTemplate = (recipe) => html`
    <article class="preview" @click="${() => detailsHandler(recipe._id)}">
        <div class="title">
            <h2>${recipe.name}</h2>
        </div>
        <div class="small">
            <img src=${recipe.img} />
        </div>
    </article>
`;

const catalogTemplate = (recipes, page, pages, search = '') =>
    html`
        <div class="section-title">
            <form id="searchForm" @submit=${searchHandler}>
                <input type="text" name="search" value="" />
                <input type="submit" value="Search" />
            </form>
        </div>
        
        <header class="section-title">
            Page ${page} of ${pages}
            ${page != 1 ? html`<a class="pager" href="/catalog?page=${page - 1}&search=${search}">&lt; Prev</a>` : nothing}
            ${page < pages ? html`<a class="pager" href="/catalog?page=${page + 1}&search=${search}">Next &gt;</a>` : nothing}
        </header>
        
        ${recipes.map((x) => recipeTemplate(x))}
        
        <footer class="section-title">
            Page ${page} of ${pages}
            ${page != 1 ? html`<a class="pager" href="/catalog?page=${page - 1}&search=${search}">&lt; Prev</a>` : nothing}
            ${page < pages ? html`<a class="pager" href="/catalog?page=${page + 1}&search=${search}">Next &gt;</a>` : nothing}
        </footer>
    `;

export const catalogView = async (ctx) => {
    context = ctx;

    const page = Number(new URLSearchParams(ctx.querystring).get('page'));
    let pages = Number(await recipeService.getPages());

    const search = new URLSearchParams(ctx.querystring).get('search');

    if (search) {
        const foundRecipes = await recipeService.search(search, page || 1);
        const foundAllCount = await recipeService.searchCount(search)
        if (foundAllCount < 3) {
            pages = 1;
        }
        ctx.render(catalogTemplate(foundRecipes, page || 1, pages, search))
    } else {
        const recipes = await recipeService.getPaginatedRecipes(page || 1);
        ctx.render(catalogTemplate(recipes, page || 1, pages));
    }
};
