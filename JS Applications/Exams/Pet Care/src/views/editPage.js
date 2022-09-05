import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';

//method="POST" @submit=${editHandler}

const editTemplate = (animal, editHandler) => html`
    <section id="editPage">
        <form class="editForm" method="POST" @submit=${editHandler}>
            <img src="/images/editpage-dog.jpg">
            <div>
                <h2>Edit PetPal</h2>
                <div class="name">
                    <label for="name">Name:</label>
                    <input name="name" id="name" type="text" value=${animal.name}>
                </div>
                <div class="breed">
                    <label for="breed">Breed:</label>
                    <input name="breed" id="breed" type="text" value=${animal.breed}>
                </div>
                <div class="Age">
                    <label for="age">Age:</label>
                    <input name="age" id="age" type="text" value=${animal.age}>
                </div>
                <div class="weight">
                    <label for="weight">Weight:</label>
                    <input name="weight" id="weight" type="text" value=${animal.weight}>
                </div>
                <div class="image">
                    <label for="image">Image:</label>
                    <input name="image" id="image" type="text" value=${animal.image}>
                </div>
                <button class="btn" type="submit">Edit Pet</button>
            </div>
        </form>
    </section>
`;


export const editView = async (ctx) => {
    const animalId = ctx.params.animalId;
    const animal = await dataService.getById(animalId);

    const editHandler = async (e) => {
        e.preventDefault();
        const { ...data } = Object.fromEntries(new FormData(e.currentTarget));

        if (!Object.values(data).some(x => x == '')) {
            await dataService.edit(animalId, data);
            ctx.page.redirect(`/details/${animalId}`);
        } else {
            alert('Please fill all fields');
        }
    }

    ctx.render(editTemplate(animal, editHandler));
}