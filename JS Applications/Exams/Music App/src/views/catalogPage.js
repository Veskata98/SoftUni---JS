import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';

/*artist: "Pink Floyd"
​​
description: "The Dark Side of the Moon is the eighth studio album by the English rock band Pink Floyd, released on 1 March 1973 by Harvest Records."
​​
genre: "Rock Music"
​​
imgUrl: "/images/pinkFloyd.jpg"
​​
name: "The Dark Side of the Moon"
​​
price: "28.75"
​​
releaseDate: "March 1, 1973" */



const albumTemplate = (album, isLoggedIn) => html`
    <div class="card-box">
        <img src=${album.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            ${isLoggedIn
                ? html`
                    <div class="btn-group">
                        <a href="details/${album._id}" id="details">Details</a>
                    </div>`
                : nothing
            }
        </div>
    </div>
`;

const catalogTemplate = (albums, isLoggedIn) => html`
    <section id="catalogPage">
        <h1>All Albums</h1>

            ${albums.length == 0 
                ? html`<p>No Albums in Catalog!</p>`
                : albums.map(x => albumTemplate(x, isLoggedIn))
            }
            
    </section>
`;


export const catalogView = async (ctx) => {
    const albums = await dataService.getAll();
    const isLoggedIn = ctx.user;

    ctx.render(catalogTemplate(albums, isLoggedIn));
}