import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';


const detailsTemplate = () => html`

`;


export const detailsView = async (ctx) => {
    const _itemId = ctx.params.id;

    ctx.render(detailsTemplate());

    async function deleteHandler() {
        const choice = confirm('Are you sure you want to delete?');

        if (choice) {
            await dataService.del(_itemId);
            ctx.page.redirect('/');
        }
    }
}
