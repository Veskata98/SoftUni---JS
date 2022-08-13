import { loading } from '../utils.js';
import { renderHome } from './home.js';

const detailsSection = document.querySelector('.details');

const detailsUrl = 'http://localhost:3030/data/recipes';

export function renderDetails(id) {
    document.querySelector('.home').style.display = 'none';
    detailsSection.style.display = 'block';
    loading(detailsSection);
    getDetails(id);
}

async function getDetails(id) {
    const res = await fetch(`${detailsUrl}/${id}`);
    const data = await res.json();

    detailsSection.innerHTML = '';

    let user = JSON.parse(localStorage.getItem('user'));

    const article = document.createElement('article');
    article.innerHTML = `
        <h2>${data.name}</h2>
        <div class="band">
        <div class="thumb">
            <img src="${data.img}">
        </div>
        <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul>
                ${data.ingredients.map((x) => `<li>${x}</li>`).join('')}
            </ul>
        </div>
        </div>
        <div class="description">
        <h3>Preparation:</h3>
            ${data.steps.map((x) => `<p>${x}</p>`).join('')}
        </div>`;
    detailsSection.appendChild(article);
    if (user) {
        if (data._ownerId === user._id) {
            article.innerHTML += `
        <div class="controls">
            <button id="edit">\u270E Edit</button>
            <button id="delete">\u2716 Delete</button>
        </div>
        `;

            detailsSection.querySelector('#edit').addEventListener('click', async () => {
                detailsSection.innerHTML = `
            <div class="wrapper">
                <h2>Edit Recipe</h2>
                <form>
                    <label>Name: <input type="text" name="name" placeholder="Recipe name" value="${data.name}"></label>
                    <label>Image: <input type="text" name="img" placeholder="Image URL" value="${data.img}"></label>
                    <label class="ml">Ingredients: <textarea name="ingredients"
                            placeholder="Enter ingredients on separate lines">${data.ingredients.join(
                                '\n'
                            )}</textarea></label>
                    <label class="ml">Preparation: <textarea name="steps"
                            placeholder="Enter preparation steps on separate lines">${data.steps.join(
                                '\n'
                            )}</textarea></label>
                    <input type="submit" value="Update Recipe">
                </form>
            </div>
            `;

                detailsSection.querySelector('form').addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const { name, img, ingredients, steps } = Object.fromEntries(formData);

                    await fetch(`http://localhost:3030/data/recipes/${data._id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                            'X-Authorization': user.accessToken,
                        },
                        body: JSON.stringify({
                            name,
                            img,
                            ingredients: ingredients.split('\n'),
                            steps: steps.split('\n'),
                        }),
                    });
                    alert('Successfully edited');
                    renderDetails(data._id);
                });
            });

            detailsSection.querySelector('#delete').addEventListener('click', async () => {
                if (confirm('Press Ok to confirm deletion')) {
                    await fetch(`http://localhost:3030/data/recipes/${data._id}`, {
                        method: 'DELETE',
                        headers: {
                            'content-type': 'application/json',
                            'X-Authorization': user.accessToken,
                        },
                    });

                    alert('Successful Deleted');
                    renderHome();
                }
            });
        }
    }
}
