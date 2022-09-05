import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
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

const carsBuilder = (cars) => {
    if (cars == null) {
        return;
    } else if (cars.length == 0) {
        return html`<p class="no-cars"> No results.</p>`;
    } else {
        return cars.map(carCardTemplate);
    }
}


const searchTemplate = (searchHandler, cars) => html`
    <section id="search-cars">
        <h1>Filter by year</h1>
    
        <div class="container">
            <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
            <button class="button-list" @click=${searchHandler}>Search</button>
        </div>
    
        <h2>Results:</h2>
        <div class="listings">
    
            ${carsBuilder(cars)}
    
        </div>
    </section>
`;

export const searchView = async (ctx) => {
    let cars = null;

    ctx.render(searchTemplate(searchHandler, cars));

    async function searchHandler() {
        let searchValue = document.getElementById('search-input').value;

        if (!isNaN(searchValue)) {
            const foundCars = await dataService.search(searchValue);

            ctx.render(searchTemplate(searchHandler, foundCars));
        }
    }
}