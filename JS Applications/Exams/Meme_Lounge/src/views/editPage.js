import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';
import { notification } from '../utils/notificatios.js';

const editTemplate = (meme, editHandler) => html`
    <section id="edit-meme">
        <form id="edit-form" method="POST" @submit=${editHandler}>
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title" value=${meme.title}>
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description">${meme.description}</textarea>
                <label for="imageUrl">Image Url</label>
                <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value=${meme.imageUrl}>
                <input type="submit" class="registerbtn button" value="Edit Meme">
            </div>
        </form>
    </section>
`;


export const editView = async (ctx) => {
    const memeId = ctx.params.id;
    const meme = await dataService.getById(memeId);

    const editHandler = async (e) => {
        e.preventDefault();
        const { ...data } = Object.fromEntries(new FormData(e.currentTarget));

        if (!Object.values(data).some(x => x == '')) {
            await dataService.edit(memeId, data);
            ctx.page.redirect(`/details/${memeId}`);
        } else {
            notification('Please fill all fields')
        }
    }

    ctx.render(editTemplate(meme, editHandler));
}