import { html } from '../../node_modules/lit-html/lit-html.js';
import * as postsService from '../services/postsService.js';

const buttonsBuilder = (post, isLoggedIn, isOwner, deleteHandler, donateHandler, hasDonated) => {
    console.log(isLoggedIn, isOwner, deleteHandler, donateHandler, hasDonated);
    if (isLoggedIn) {
        if (isOwner) {
            return html`
                <a href="/details/${post._id}/edit" class="edit-btn btn">Edit</a>
                <a href="javascript:void(0)" class="delete-btn btn" @click=${deleteHandler}>Delete</a>
            `;
        } else if (hasDonated == 0 && !isOwner) {
            return html`
                <a href="javascript:void(0)" @click=${donateHandler} class="donate-btn btn">Donate</a>
            `;
        }
    }
    return '';
}

const detailsTemplate = (post, isLoggedIn, isOwner, deleteHandler, donateHandler, donationCount, hasDonated) => html`
    <section id="details-page">
        <h1 class="title">Post Details</h1>
    
        <div id="container">
            <div id="details">
                <div class="image-wrapper">
                    <img src=${post.imageUrl} alt="Material Image" class="post-image">
                </div>
                <div class="info">
                    <h2 class="title post-title">${post.title}</h2>
                    <p class="post-description">Description: ${post.description}</p>
                    <p class="post-address">Address: ${post.address}</p>
                    <p class="post-number">Phone number: ${post.phone}</p>
                    <p class="donate-Item">Donate Materials: ${donationCount}</p>
    
                    <div class="btns">
                        ${buttonsBuilder(post, isLoggedIn, isOwner, deleteHandler, donateHandler, hasDonated)}
                    </div>
                </div>
            </div>
        </div>
    </section>
`;


export const detaildsView = async (ctx) => {
    const postId = ctx.params.postId;
    const post = await postsService.getOne(postId);

    let isLoggedIn;
    let isOwner = false;
    let hasDonated;

    const user = ctx.user;

    if (user) {
        isLoggedIn = true;
    }

    if (isLoggedIn) {
        isOwner = user._id == post._ownerId;
        hasDonated = await postsService.hasDonated(postId, user._id);
    }

    let donationCount = await postsService.getDonationCount(postId);

    ctx.render(detailsTemplate(post, isLoggedIn, isOwner, deleteHandler, donateHandler, donationCount, hasDonated));

    async function donateHandler() {
        const donation = {
            postId
        }
        await postsService.donate(donation);

        donationCount = await postsService.getDonationCount(postId);
        hasDonated = await postsService.hasDonated(postId, user._id);

        ctx.render(detailsTemplate(post, isLoggedIn, isOwner, deleteHandler, donateHandler, donationCount, hasDonated));
    }

    async function deleteHandler() {
        const choice = confirm('Are you sure?');

        if (choice) {
            await postsService.del(postId);
            ctx.page.redirect('/');
        }
    }
}
