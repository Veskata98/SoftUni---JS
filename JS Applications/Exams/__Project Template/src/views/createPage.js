import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';

//method="POST" @submit=${createHandler}

const createTemplate = (createHandler) => html`

`;


export const createView = (ctx) => {

    const createHandler = async (e) => {
        e.preventDefault();
        const { ...data } = Object.fromEntries(new FormData(e.currentTarget));

        if (!Object.values(data).some(x => x == '')) {
            await dataService.create(data);
            ctx.page.redirect('/catalog');
        } else {
            alert('Please fill all fields');
        }
    }

    ctx.render(createTemplate(createHandler));
}