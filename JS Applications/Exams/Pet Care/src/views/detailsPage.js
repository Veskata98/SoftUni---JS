import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';

const donateLink = (hasDonated, donateHandler) => {
    if(hasDonated == 0){
        return html`<a href="javascript:void(0)" @click=${donateHandler} class="donate">Donate</a>`;
    }else{
        return nothing;
    }
} 

const detailsTemplate = (animal, isLoggedIn, isOwner, deleteHandler, donateHandler, donationCount, hasDonated) => html`
    <section id="detailsPage">
        <div class="details">
            <div class="animalPic">
                <img src=${animal.image}>
            </div>
            <div>
                <div class="animalInfo">
                    <h1>Name: ${animal.name}</h1>
                    <h3>Breed: ${animal.breed}</h3>
                    <h4>Age: ${animal.age}</h4>
                    <h4>Weight: ${animal.weight}</h4>
                    <h4 class="donation">Donation: ${donationCount * 100}$</h4>
                </div>
                ${isLoggedIn 
                    ? html`
                        <div class="actionBtn">
                            ${isOwner 
                                ? html`
                                    <a href="/details/${animal._id}/edit" class="edit">Edit</a>
                                    <a href="javascript:void(0)" @click=${deleteHandler} class="remove">Delete</a>
                                `
                                : donateLink(hasDonated, donateHandler)
                            }
                        </div>`
                    : nothing
                }
            </div>
        </div>
    </section>
`;


export const detaildsView = async (ctx) => {
    const animalId = ctx.params.animalId;
    const animal = await dataService.getById(animalId);

    let hasDonated;

    const user = ctx.user;

    const isLoggedIn = user;
    const isOwner = isLoggedIn && user._id == animal._ownerId;

    const donationCount = await dataService.donationCount(animalId);

    if(user){
        hasDonated = await dataService.hasDonated(animalId,user._id);
    }

    const deleteHandler = async () => {
        const choice = confirm('Are you sure?');
        
        if (choice){
            await dataService.del(animalId);
            ctx.page.redirect('/');
        }
    }

    const donateHandler = async () => {
        const donation = {
            petId: animalId
        }
        
        await dataService.donate(donation);
        ctx.page.redirect(`/details/${animalId}`);
    }
    
    ctx.render(detailsTemplate(animal, isLoggedIn, isOwner, deleteHandler, donateHandler, donationCount, hasDonated));
}
