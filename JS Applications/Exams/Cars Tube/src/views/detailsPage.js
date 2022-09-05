import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';


const detailsTemplate = (car, isLoggedIn, isOwner, deleteCar) => html`
    <section id="listing-details">
        <h1>Details</h1>
        <div class="details-info">
            <img src=${car.imageUrl}>
            <hr>
            <ul class="listing-props">
                <li><span>Brand:</span>${car.brand}</li>
                <li><span>Model:</span>${car.model}</li>
                <li><span>Year:</span>${car.year}</li>
                <li><span>Price:</span>${car.price}$</li>
            </ul>
    
            <p class="description-para">${car.description}</p>
    
            ${isOwner
                ? html`
                    <div class="listings-buttons">
                        <a href="/edit/${car._id}" class="button-list">Edit</a>
                        <a href="javascript:void(0)" @click=${deleteCar} class="button-list">Delete</a>
                    </div>`
                : nothing 
            }
    
        </div>
    </section>
`;


export const detailsView = async (ctx) => {
    const carId = ctx.params.id;
    const car = await dataService.getById(carId);

    const user = ctx.user

    const isLoggedIn = user;
    const isOwner = user && user._id == car._ownerId;

    ctx.render(detailsTemplate(car, isLoggedIn, isOwner, deleteCar));

    async function deleteCar() {
        const choice = confirm('Are you sure?');

        if (choice) {
            await dataService.del(carId);
            ctx.page.redirect('/all');
        }
    }
}
