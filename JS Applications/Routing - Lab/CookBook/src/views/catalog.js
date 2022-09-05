import { e, html } from '../dom.js';
import { getRecipes, getRecipeCount } from '../api/data.js';

let searchRecipes = null;
let navigation = null;

const catalogTemplate = (recipes, goTo, page, pages) => html`
    <section id="catalog">
        ${search()}
        <header class="section-title">${pager(goTo, page, pages)}</header>
        ${recipes.map((r) => recipePreview(r, goTo))}
        <footer class="section-title">${pager(goTo, page, pages)}</footer>
    </section>
`;

const recipePreview = (recipe, goTo) => html`
    <article class="preview" @click=${() => goTo('details', recipe._id)}>
        <div class="title">
            <h2>${recipe.name}</h2>
        </div>
        <div class="small"><img src=${recipe.img} /></div>
    </article>
`;

const search = () =>
    html`
        <header class="section-title search-section">
            <div>
                <input id="search_value" type="text" placeholder="Enter search value" />
                <button @click="${searchHandler}" class="search-btn">Search</button>
            </div>
        </header>
    `;

const pager = (goTo, page, pages) => html`
    Page ${page} of ${pages}
    ${page > 1
        ? html`
              <a class="pager" href="/catalog" @click=${(e) => changePage(e, goTo, page - 1)}>&lt; Prev</a>
          `
        : ''}
    ${page < pages
        ? html`
              <a class="pager" href="/catalog" @click=${(e) => changePage(e, goTo, page + 1)}>Next &gt;</a>
          `
        : ''}
`;

function changePage(e, goTo, newPage) {
    e.preventDefault();
    goTo('catalog', newPage);
}

export function setupCatalog(nav) {
    navigation = nav;

    return showCatalog;

    async function showCatalog(page = 1) {
        const recipes = searchRecipes || (await getRecipes(page));
        const count = await getRecipeCount();
        const pages = Math.ceil(count / 5);
        return catalogTemplate(recipes, nav.goTo, page, pages);
    }
}

const searchHandler = () => {
    const value = document.getElementById('search_value').value;
    if (value != '') {
        fetch(`http://localhost:3030/data/recipes?where=name%20LIKE%20%22${value}%22 `)
            .then((res) => res.json())
            .then((data) => {
                searchRecipes = data;
                navigation.goTo('catalog');
            });
    } else {
        searchRecipes = null;
        navigation.goTo('catalog');
    }
};
