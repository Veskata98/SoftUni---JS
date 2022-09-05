import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';



const editTemplate = (car, editHandler) => html`
    <section id="edit-listing">
        <div class="container">
    
            <form id="edit-form" method="POST" @submit=${editHandler}>
                <h1>Edit Car Listing</h1>
                <p>Please fill in this form to edit an listing.</p>
                <hr>
    
                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand" value=${car.brand}>
    
                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model" value=${car.model}>
    
                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description" value=${car.description}>
    
                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year" value=${car.year}>
    
                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl" value=${car.imageUrl}>
    
                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price" value=${car.price}>
    
                <hr>
                <input type="submit" class="registerbtn" value="Edit Listing">
            </form>
        </div>
    </section>
`;


export const editView = async (ctx) => {
    const carId = ctx.params.id;
    const car = await dataService.getById(carId);

    const editHandler = async (e) => {
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

            await dataService.edit(carId, carData);
            ctx.page.redirect(`/details/${carId}`);
        } else {
            alert('Please fill all fields');
        }
    }

    ctx.render(editTemplate(car, editHandler));
}