import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getMyItems } from '../api/data.js';
import { loading, mainElement, updateNav } from '../utils.js';

const myFurnitureTemplate = (items) => html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>My Furniture</h1>
                <p>This is a list of your publications.</p>
            </div>
        </div>
        <div class="row space-top">
            ${items.map(
                (x) => html`
                    <div class="col-md-4">
                        <div class="card text-white bg-primary">
                            <div class="card-body">
                                <img src="${x.img.includes('http') ? `${x.img}` : `.${x.img}`}" />
                                <p>${x.description}</p>
                                <footer>
                                    <p>
                                        Price:
                                        <span>${x.price} $</span>
                                    </p>
                                </footer>
                                <div>
                                    <a href="/details/${x._id}" class="btn btn-info">Details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            )}
        </div>
    </div>
`;

export const showMyFurniture = async () => {
    updateNav('/my-furniture');

    render(loading(), mainElement());

    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const myItems = await getMyItems(userId);
    render(myFurnitureTemplate(myItems), mainElement());
};
