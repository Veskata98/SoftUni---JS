import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';

const createTemplate = (createHandler) => html`
    <section id="create-page" class="auth">
        <form id="create" method="POST" @submit=${createHandler}>
            <div class="container">
    
                <h1>Create Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" placeholder="Enter game title...">
    
                <label for="category">Category:</label>
                <input type="text" id="category" name="category" placeholder="Enter game category...">
    
                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">
    
                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">
    
                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary"></textarea>
                <input class="btn submit" type="submit" value="Create Game">
            </div>
        </form>
    </section>
`;

export const createView = (ctx) => {

    const createHandler = async (e) => {
        e.preventDefault();
        const { ...data } = Object.fromEntries(new FormData(e.currentTarget));

        if (!Object.values(data).some(x => x == '')) {
            await dataService.create(data);
            ctx.page.redirect('/');
        } else {
            alert('Please fill all fields');
        }
    }

    ctx.render(createTemplate(createHandler));
}