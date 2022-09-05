import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';


const createTemplate = (createHandler) => html`
    <section id="create-listing">
        <div class="container">
            <form id="create-form" method="POST" @submit=${createHandler}>
                <h1>Create Car Listing</h1>
                <p>Please fill in this form to create an listing.</p>
                <hr>
    
                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand">
    
                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model">
    
                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description">
    
                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year">
    
                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl">
    
                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price">
    
                <hr>
                <input type="submit" class="registerbtn" value="Create Listing">
            </form>
        </div>
    </section>
`;


export const createView = (ctx) => {

    const createHandler = async (e) => {
        e.preventDefault();
        const { ...data } = Object.fromEntries(new FormData(e.currentTarget));

        if (!Object.values(data).some(x => x == '') && Number(data.year) >= 0 && Number(data.price) >= 0) {
            const carData = {
                brand: data.brand,
                model: data.model,
                description: data.description,
                year: Number(data.year),
                imageUrl: data.imageUrl,
                price: Number(data.price)
            }

            await dataService.create(carData);
            ctx.page.redirect('/all');
        } else {
            alert('Please fill all fields');
        }
    }

    ctx.render(createTemplate(createHandler));
}