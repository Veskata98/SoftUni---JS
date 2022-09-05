import { html } from '../../node_modules/lit-html/lit-html.js';
import * as postsService from '../services/postsService.js';


const createTemplate = (createHandler) => html`
    <section id="create-page" class="auth">
        <form id="create" method="POST" @submit=${createHandler}>
            <h1 class="title">Create Post</h1>
    
            <article class="input-group">
                <label for="title">Post Title</label>
                <input type="title" name="title" id="title">
            </article>
    
            <article class="input-group">
                <label for="description">Description of the needs </label>
                <input type="text" name="description" id="description">
            </article>
    
            <article class="input-group">
                <label for="imageUrl"> Needed materials image </label>
                <input type="text" name="imageUrl" id="imageUrl">
            </article>
    
            <article class="input-group">
                <label for="address">Address of the orphanage</label>
                <input type="text" name="address" id="address">
            </article>
    
            <article class="input-group">
                <label for="phone">Phone number of orphanage employee</label>
                <input type="text" name="phone" id="phone">
            </article>
    
            <input type="submit" class="btn submit" value="Create Post">
        </form>
    </section>
`;


export const createView = (ctx) => {

    const createHandler = async (e) => {
        e.preventDefault();
        const { ...data } = Object.fromEntries(new FormData(e.currentTarget));

        if (Object.values(data).some(x => !x)) {
            return alert('Please fill all fields');
        }

        await postsService.create(data);
        ctx.page.redirect('/');
    }
    ctx.render(createTemplate(createHandler));
}