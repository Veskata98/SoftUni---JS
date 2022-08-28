import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getItems } from '../api/data.js';
import { updateNav, mainElement, loading } from '../utils.js';

const homeTemplate = (items) => html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
        <div class="row space-top">
            ${items.map(
                (x) => html` 
                <div class="col-md-4">
                    <div class="card text-white bg-primary">
                        <div class="card-body">
                            <img src="${x.img}" />
                            <p>${x.description}</p>
                            <footer>
                                <p>Price: <span>${x.price} $</span></p>
                            </footer>
                            <div>
                                <a href="/details/${x._id}" class="btn btn-info">Details</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
            )}
            </div>
            </div>
        </div>
    </div>
`;

export const showHome = async () => {
    updateNav();

    render(loading(), mainElement());

    const items = await getItems();
    render(homeTemplate(items), mainElement());
};
