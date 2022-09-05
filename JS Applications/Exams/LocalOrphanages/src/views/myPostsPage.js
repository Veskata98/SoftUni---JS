import { html } from '../../node_modules/lit-html/lit-html.js';
import * as postsService from '../services/postsService.js';

const postTemplate = (post) => html`
    <div class="post">
        <h2 class="post-title">${post.title}</h2>
        <img class="post-image" src=${post.imageUrl} alt="Material Image">
        <div class="btn-wrapper">
            <a href="/details/${post._id}" class="details-btn btn">Details</a>
        </div>
    </div>
`;

const myPostsTemplate = (posts) => html`
    <section id="my-posts-page">
        <h1 class="title">My Posts</h1>

        ${posts.length > 0 
            ? html`
                <div class="my-posts">
                    ${posts.map(postTemplate)}
                </div>`
            : html`
                <h1 class="title no-posts-title">You have no posts yet!</h1>
            `
        }
    </section>
`;


export const myPostsView = async (ctx) => {
    const userId = ctx.user._id;
    const posts = await postsService.getMyPosts(userId);

    ctx.render(myPostsTemplate(posts));
}