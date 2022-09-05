import { html } from '../../node_modules/lit-html/lit-html.js';
import * as postsService from '../services/postsService.js';


const editTemplate = (post, editHandler) => html`
    <section id="edit-page" class="auth">
        <<form id="edit" method="POST" @submit=${editHandler}>
            <h1 class="title">Edit Post</h1>
    
            <article class="input-group">
                <label for="title">Post Title</label>
                <input type="title" name="title" id="title" value=${post.title}>
            </article>
    
            <article class="input-group">
                <label for="description">Description of the needs </label>
                <input type="text" name="description" id="description" value=${post.description}>
            </article>
    
            <article class="input-group">
                <label for="imageUrl"> Needed materials image </label>
                <input type="text" name="imageUrl" id="imageUrl" value=${post.imageUrl}>
            </article>
    
            <article class="input-group">
                <label for="address">Address of the orphanage</label>
                <input type="text" name="address" id="address" value=${post.address}>
            </article>
    
            <article class="input-group">
                <label for="phone">Phone number of orphanage employee</label>
                <input type="text" name="phone" id="phone" value=${post.phone}>
            </article>
    
            <input type="submit" class="btn submit" value="Edit Post">
            </form>
    </section>
`;


export const editView = async (ctx) => {
    const id = ctx.params.postId;
    const post = await postsService.getOne(id);

    const editHandler = async (e) => {
        e.preventDefault();
        const { ...data } = Object.fromEntries(new FormData(e.currentTarget));

        if (Object.values(data).some(x => !x)) {
            return alert('Please fill all fields');
        }

        await postsService.edit(id, data);
        ctx.page.redirect(`/details/${id}`);
    }

    ctx.render(editTemplate(post, editHandler));
}