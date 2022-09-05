import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';

//method="POST" @submit=${editHandler}

const editTemplate = (album, editHandler) => html`

`;


export const editView = async (ctx) => {
    const _itemId = ctx.params.id;
    const _item = await dataService.getById(_itemId);

    const editHandler = async (e) => {
        e.preventDefault();
        const { ...data } = Object.fromEntries(new FormData(e.currentTarget));

        if (!Object.values(data).some(x => x == '')) {
            await dataService.edit(_itemId, data);
            ctx.page.redirect(`/details/${_itemId}`);
        } else {
            alert('Please fill all fields');
        }
    }

    ctx.render(editTemplate(_item, editHandler));
}