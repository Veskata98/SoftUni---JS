import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';


const detailsTemplate = (album, isLoggedIn, isOwner, deleteHandler) => html`
    <section id="detailsPage">
        <div class="wrapper">
            <div class="albumCover">
                <img src=${album.imgUrl}>
            </div>
            <div class="albumInfo">
                <div class="albumText">
    
                    <h1>Name: ${album.name}</h1>
                    <h3>Artist: ${album.artist}</h3>
                    <h4>Genre: ${album.genre}</h4>
                    <h4>Price: $${album.price}</h4>
                    <h4>Date: ${album.releaseDate}</h4>
                    <p>${album.description}</p>
                </div>
    
                ${isLoggedIn && isOwner
                    ? html`
                        <div class="actionBtn">
                            <a href="/edit/${album._id}" class="edit">Edit</a>
                            <a href="javascript:void(0)" @click=${deleteHandler} class="remove">Delete</a>
                        </div>`
                    : nothing
                }

            </div>
        </div>
    </section>
`;


export const detaildsView = async (ctx) => {
    const albumId = ctx.params.id;
    const album = await dataService.getById(albumId);

    const user = ctx.user

    const isLoggedIn = user;
    const isOwner = user && user._id == album._ownerId;

    ctx.render(detailsTemplate(album, isLoggedIn, isOwner, deleteHandler));

    async function deleteHandler() {
        const choice = confirm('Are you sure?');

        if (choice) {
            await dataService.del(albumId);
            ctx.page.redirect('/catalog');
        }
    }
}
