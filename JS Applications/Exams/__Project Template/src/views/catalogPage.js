import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';


const cardTemplate = (album, isLoggedIn) => html`
    ${isLoggedIn
        ? html``
        : nothing
    }
    

`;

const catalogTemplate = (_items, isLoggedIn) => html`
    ${_items.length == 0 
        ? html`<p>No _items in Catalog!</p>`
        : _items.map(x => cardTemplate(x, isLoggedIn))
    }


`;

export const catalogView = async (ctx) => {
    const _items = await dataService.getAll();
    const isLoggedIn = ctx.user;

    ctx.render(catalogTemplate(_items, isLoggedIn));
}