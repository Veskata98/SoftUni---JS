import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';

const editTemplate = (theater, editHandler) => html`
    <section id="editPage">
        <form class="theater-form" method="POST" @submit=${editHandler}>
            <h1>Edit Theater</h1>
            <div>
                <label for="title">Title:</label>
                <input id="title" name="title" type="text" placeholder="Theater name" value=${theater.title}>
            </div>
            <div>
                <label for="date">Date:</label>
                <input id="date" name="date" type="text" placeholder="Month Day, Year" value=${theater.date}>
            </div>
            <div>
                <label for="author">Author:</label>
                <input id="author" name="author" type="text" placeholder="Author" value=${theater.author}>
            </div>
            <div>
                <label for="description">Theater Description:</label>
                <textarea id="description" name="description" placeholder="Description">${theater.description}</textarea>
            </div>
            <div>
                <label for="imageUrl">Image url:</label>
                <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" value=${theater.imageUrl}>
            </div>
            <button class="btn" type="submit">Submit</button>
        </form>
    </section>
`;


export const editView = async (ctx) => {
    const theaterId = ctx.params.id;
    const theater = await dataService.getById(theaterId);

    const editHandler = async (e) => {
        e.preventDefault();
        const { ...data } = Object.fromEntries(new FormData(e.currentTarget));

        if (!Object.values(data).some(x => x == '')) {
            await dataService.edit(theaterId, data);
            ctx.page.redirect(`/details/${theaterId}`);
        } else {
            alert('Please fill all fields');
        }
    }

    ctx.render(editTemplate(theater, editHandler));
}