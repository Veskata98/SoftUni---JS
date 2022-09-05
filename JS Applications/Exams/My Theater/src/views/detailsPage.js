import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';

const likeButtonShow = (hasLiked, likeHandler) => {
    if(hasLiked == 0){
        return html`<a class="btn-like" href="javascript:void(0)" @click=${likeHandler}>Like</a>`;
    }else{
        return nothing;
    }
}


const detailsTemplate = (theater, isOwner, deleteHandler, likeHandler, likes, hasLiked) => html`
    <section id="detailsPage">
        <div id="detailsBox">
            <div class="detailsInfo">
                <h1>Title: ${theater.title}</h1>
                <div>
                    <img src=${theater.imageUrl} />
                </div>
            </div>
    
            <div class="details">
                <h3>Theater Description</h3>
                <p>${theater.description}</p>
                <h4>Date: ${theater.date}</h4>
                <h4>Author: ${theater.author}</h4>
                <div class="buttons">
                        ${isOwner
                            ? html`
                                <a class="btn-delete" href="javascript:void(0)" @click=${deleteHandler}>Delete</a>
                                <a class="btn-edit" href="/edit/${theater._id}">Edit</a>
                            `
                            : likeButtonShow(hasLiked, likeHandler)
                        }
                </div>
                <p class="likes">Likes: ${likes}</p>
            </div>
        </div>
    </section>
`;


export const detaildsView = async (ctx) => {
    const theaterId = ctx.params.id;
    const theater = await dataService.getById(theaterId);
    const likes = await dataService.likesCount(theaterId);

    let hasLiked;

    const user = ctx.user;

    const isOwner = user && user._id == theater._ownerId;

    if(user){
        hasLiked = await dataService.hasLiked(theaterId, user._id);
    }

    ctx.render(detailsTemplate(theater, isOwner, deleteHandler, likeHandler, likes, hasLiked));

    async function deleteHandler() {
        const choice = confirm('Are you sure you want to delete?');

        if (choice) {
            await dataService.del(theaterId);
            ctx.page.redirect('/');
        }
    }

    async function likeHandler() {
        const likeData = {
            theaterId: theaterId
        };
        await dataService.like(likeData);

        const newLikes = await dataService.likesCount(theaterId);
        hasLiked = await dataService.hasLiked(theaterId, user._id);

        ctx.render(detailsTemplate(theater, isOwner, deleteHandler, likeHandler, newLikes, hasLiked));
    }
}
