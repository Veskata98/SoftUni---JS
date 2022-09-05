import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';


const gameTemplate = (game) => html`
    <div class="allGames">
        <div class="allGames-info">
            <img src=${game.imageUrl}>
            <h6>${game.genre}</h6>
            <h2>${game.title}</h2>
            <a href="/details/${game._id}" class="details-button">Details</a>
        </div>
    </div>
`;

const allGamesTemplate = (games) => html`
    <section id="catalog-page">
        <h1>All Games</h1>
        
        ${games.length == 0 
            ? html`<h3 class="no-articles">No articles yet</h3>`
            : games.map(gameTemplate)
        }

    </section>
`;

export const allGamesView = async (ctx) => {
    const games = await dataService.getAll();
    ctx.render(allGamesTemplate(games));
}