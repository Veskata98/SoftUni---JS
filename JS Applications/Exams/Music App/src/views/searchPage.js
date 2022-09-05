import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';

const resultsBuilder = (albums, isLoggedIn) => {
    if (albums == null) {
        return;

    } else if (albums.length == 0) {
        return html`
            <div class="search-result">
                <p class="no-result">No result.</p>
            </div>`;

    } else {
        return albums.map(x => html`
        <div class="search-result">
            <div class="card-box">
                <img src=${x.imgUrl}>
                <div>
                    <div class="text-center">
                        <p class="name">Name: ${x.name}</p>
                        <p class="artist">Artist: ${x.artist}e</p>
                        <p class="genre">Genre: ${x.genre}</p>
                        <p class="price">Price: $${x.price}</p>
                        <p class="date">Release Date: ${x.releaseDate}</p>
                    </div>
                    ${isLoggedIn
                        ? html` 
                            <div class="btn-group">
                                <a href="edit/${x._id}" id="details">Details</a>
                            </div>`
                        : nothing
                    }
                </div>
            </div>
        </div>`
        );
    }
}


const searchTemplate = (searchHandler, albums, isLoggedIn) => html`
    <section id="searchPage">
        <h1>Search by Name</h1>
    
        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button class="button-list" @click=${searchHandler}>Search</button>
        </div>
    
        <h2>Results:</h2>
    
        ${resultsBuilder(albums, isLoggedIn)}
        
    </section>
`;

export const searchView = (ctx) => {
    const isLoggedIn = ctx.user;

    ctx.render(searchTemplate(searchHandler, null, isLoggedIn));

    async function searchHandler() {
        const inputValue = document.querySelector('#search-input').value;

        if (inputValue) {
            const foundAlbums = await dataService.search(inputValue);
            ctx.render(searchTemplate(searchHandler, foundAlbums, isLoggedIn));

        } else {
            alert('Please fill the input field');
        }
    }
} 