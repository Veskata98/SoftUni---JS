import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';



const editTemplate = (album, editHandler) => html`
    <section class="editPage">
        <form method="POST" @submit=${editHandler}>
            <fieldset>
                <legend>Edit Album</legend>
    
                <div class="container">
                    <label for="name" class="vhide">Album name</label>
                    <input id="name" name="name" class="name" type="text" value=${album.name}>
    
                    <label for="imgUrl" class="vhide">Image Url</label>
                    <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value=${album.imgUrl}>
    
                    <label for="price" class="vhide">Price</label>
                    <input id="price" name="price" class="price" type="text" value=${album.price}>
    
                    <label for="releaseDate" class="vhide">Release date</label>
                    <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value=${album.releaseDate}>
    
                    <label for="artist" class="vhide">Artist</label>
                    <input id="artist" name="artist" class="artist" type="text" value=${album.artist}>
    
                    <label for="genre" class="vhide">Genre</label>
                    <input id="genre" name="genre" class="genre" type="text" value=${album.genre}>
    
                    <label for="description" class="vhide">Description</label>
                    <textarea name="description" class="description" rows="10" cols="10">${album.description}</textarea>
    
                    <button class="edit-album" type="submit">Edit Album</button>
                </div>
            </fieldset>
        </form>
    </section>
`;


export const editView = async (ctx) => {
    const albumId = ctx.params.id;
    const album = await dataService.getById(albumId);

    const editHandler = async (e) => {
        e.preventDefault();
        const { ...data } = Object.fromEntries(new FormData(e.currentTarget));

        if (!Object.values(data).some(x => x == '')) {
            await dataService.edit(albumId, data);
            ctx.page.redirect(`/details/${albumId}`);
        } else {
            alert('Please fill all fields');
        }
    }

    ctx.render(editTemplate(album, editHandler));
}