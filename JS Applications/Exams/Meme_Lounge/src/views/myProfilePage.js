import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';

const memeCardTemplate = (meme) => html`
    <div class="user-meme">
        <p class="user-meme-title">${meme.title}</p>
        <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
        <a class="button" href="/details/${meme._id}">Details</a>
    </div>
`;

const myProfileTemplate = (user, memes) => html`
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src="/images/female.png">
            <div class="user-content">
                <p>Username: ${user.username}</p>
                <p>Email: ${user.email}</p>
                <p>My memes count: ${memes.length}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
            
            ${memes.length == 0 
                ? html`<p class="no-memes">No memes in database.</p>`
                : memes.map(memeCardTemplate)
            }

        </div>
    </section>
`;

export const myProfileView = async (ctx) => {
    const user = ctx.user;

    const memes = await dataService.getMyMemes(user._id);

    ctx.render(myProfileTemplate(user, memes));
}