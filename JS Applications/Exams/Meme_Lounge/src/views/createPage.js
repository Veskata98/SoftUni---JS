import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';
import { notification } from '../utils/notificatios.js';

const createTemplate = (createHandler) => html`
    <section id="create-meme">
        <form id="create-form" method="POST" @submit=${createHandler}>
            <div class="container">
                <h1>Create Meme</h1>
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                <label for="imageUrl">Meme Image</label>
                <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                <input type="submit" class="registerbtn button" value="Create Meme">
            </div>
        </form>
    </section>
`;


export const createView = (ctx) => {

    const createHandler = async (e) => {
        e.preventDefault();
        const { ...data } = Object.fromEntries(new FormData(e.currentTarget));

        if (!Object.values(data).some(x => x == '')) {
            await dataService.create(data);
            ctx.page.redirect('/all-memes');
        } else {
            notification('Please fill all fields');
        }
    }

    ctx.render(createTemplate(createHandler));
}