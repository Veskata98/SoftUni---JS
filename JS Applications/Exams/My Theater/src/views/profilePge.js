import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';

const cardTemplate = (theater) => html`
    <div class="eventBoard">
        <div class="event-info">
            <img src=${theater.imageUrl}>
            <h2>${theater.title}</h2>
            <h6>${theater.date}</h6>
            <a href="/details/${theater._id}" class="details-button">Details</a>
        </div>
    </div>
`;

const profileTemplate = (user, myTheaters) => html`
    <section id="profilePage">
        <div class="userInfo">
            <div class="avatar">
                <img src="./images/profilePic.png">
            </div>
            <h2>${user.email}</h2>
        </div>
        <div class="board">

            ${myTheaters.length == 0 
                ? html`
                    <div class="no-events">
                        <p>This user has no events yet!</p>
                    </div>`
                : myTheaters.map(cardTemplate)
            }

        </div>
    </section>
`;


export const profileView = async (ctx) => {
    const user = ctx.user;
    const myTheaters = await dataService.getMyTheaters(user._id);
    
    ctx.render(profileTemplate(user, myTheaters));
}