import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getItem } from '../api/data.js';
import { loading, mainElement } from '../utils.js';

let userId = null;

const ownedItem = (id) => html`
    <div>
        <a href="/edit/${id}" class="btn btn-info">Edit</a>
        <a href="/delete/${id}" class="btn btn-red">Delete</a>
    </div>
`;

const detailTemplate = (item, userId) => html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src="${item.img.includes('http') ? `${item.img}` : `.${item.img}`}" />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>
                    Make:
                    <span>${item.make}</span>
                </p>
                <p>
                    Model:
                    <span>${item.model}</span>
                </p>
                <p>
                    Year:
                    <span>${item.year}</span>
                </p>
                <p>
                    Description:
                    <span>${item.description}</span>
                </p>
                <p>
                    Price:
                    <span>${item.price}</span>
                </p>
                <p>
                    Material:
                    <span>${item.material}</span>
                </p>
                ${item._ownerId == userId ? ownedItem(item._id) : ''}
            </div>
        </div>
    </div>
`;

export const showDetails = async (ctx) => {
    render(loading(), mainElement());

    const user = localStorage.getItem('user');

    if (user) {
        userId = JSON.parse(user)._id;
    }

    const item = await getItem(ctx.params.id);
    render(detailTemplate(item, userId), mainElement());
};
