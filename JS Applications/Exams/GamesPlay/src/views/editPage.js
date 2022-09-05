import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';

const editTemplate = (game, editHandler) => html`
    <section id="edit-page" class="auth">
        <form id="edit" method="POST" @submit=${editHandler}>
            <div class="container">
    
                <h1>Edit Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" value=${game.title}>
    
                <label for="category">Category:</label>
                <input type="text" id="category" name="category" value=${game.category}>
    
                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" value=${game.maxLevel}>
    
                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" value=${game.imageUrl}>
    
                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary">${game.summary}</textarea>
                <input class="btn submit" type="submit" value="Edit Game">
    
            </div>
        </form>
    </section>
`;


export const editView = async (ctx) => {
    const gameId = ctx.params.id;
    const game = await dataService.getById(gameId);

    const editHandler = async (e) => {
        e.preventDefault();
        const { ...data } = Object.fromEntries(new FormData(e.currentTarget));

        if (!Object.values(data).some(x => x == '')) {
            await dataService.edit(gameId, data);
            ctx.page.redirect(`/details/${gameId}`);
        } else {
            alert('Please fill all fields');
        }
    }

    ctx.render(editTemplate(game, editHandler));
}