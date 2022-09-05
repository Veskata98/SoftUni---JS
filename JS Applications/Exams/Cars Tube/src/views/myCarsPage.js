import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';

const carCardTemplate = (car) => html`
    <div class="listing">
        <div class="preview">
            <img src=${car.imageUrl}>
        </div>
        <h2>${car.brand} ${car.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${car.year}</h3>
                <h3>Price: ${car.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${car._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>
`;

const myCarsTemplate = (cars) => html`
    <section id="my-listings">
        <h1>My car listings</h1>
        <div class="listings">
    
            ${cars.length == 0 
                ? html`
                    <p class="no-cars"> You haven't listed any cars yet.</p>
                `
                : html`
                    ${cars.map(carCardTemplate)}
                `
            }
    
            <!-- Display if there are no records -->
            <p class="no-cars"> You haven't listed any cars yet.</p>
        </div>
    </section>

`;


export const myCarsView = async (ctx) => {
    const userId = ctx.user._id;

    const cars = await dataService.getMyCars(userId);
    ctx.render(myCarsTemplate(cars));
}