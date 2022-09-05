import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';

const likeButtonShow = (isLoggedIn, likeHandler, hasLiked) => {
    if (isLoggedIn && hasLiked == 0){
        return html`<a class="button" href="javascript:void(0)" @click=${likeHandler}>Like</a>`;
    }
    return nothing;
}


const detailsTemplate = (book, deleteHandler, isOwner, isLoggedIn, likeHandler, hasLiked, likes) => html`
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${book.title}</h3>
            <p class="type">Type: ${book.type}</p>
            <p class="img"><img src=${book.imageUrl}></p>
            <div class="actions">
                
                ${isOwner
                    ? html` 
                        <a class="button" href="/edit/${book._id}">Edit</a>
                        <a class="button" href="javascript:void(0)" @click=${deleteHandler}>Delete</a>
                    ` 
                    : likeButtonShow(isLoggedIn, likeHandler, hasLiked)
                }

                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${likes}</span>
                </div>

            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${book.description}</p>
        </div>
    </section>
`;


export const detailsView = async (ctx) => {
    const bookId = ctx.params.id;
    const book = await dataService.getById(bookId);

    let isLoggedIn;
    let hasLiked;
    let likes = await dataService.likesCount(bookId);

    const user = ctx.user;
    isLoggedIn = user;

    const isOwner = user && user._id == book._ownerId;

    if(user){
        hasLiked = await dataService.hasLiked(bookId, user._id);
    }

    ctx.render(detailsTemplate(book, deleteHandler, isOwner, isLoggedIn, likeHandler, hasLiked, likes));

    async function deleteHandler() {
        const choice = confirm('Are you sure you want to delete?');

        if (choice) {
            await dataService.del(bookId);
            ctx.page.redirect('/');
        }
    }

    async function likeHandler() {
        const likeData = {
            bookId
        };
        await dataService.like(likeData);

        likes = await dataService.likesCount(bookId); 
        hasLiked = await dataService.hasLiked(bookId, user._id);

        ctx.render(detailsTemplate(book, deleteHandler, isOwner, isLoggedIn, likeHandler, hasLiked, likes));
    }
}
