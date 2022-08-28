import { deleteIdea, getDetails } from '../api/data.js';

const section = document.getElementById('details');

export async function showDetails(context, id) {
    context.showSection(section);
    const details = await getDetails(id);

    const user = JSON.parse(localStorage.getItem('user'));
    const isOwner = user && details._ownerId == user._id;

    section.innerHTML = detailsHTML(details, isOwner);

    if (isOwner) {
        section.querySelector('#deleteBtn').addEventListener('click', async (e) => {
            e.preventDefault();
            const choice = confirm('Are you sure you want to delete this idea?');
            if (choice) {
                deleteIdea(id);
                context.goTo('/catalog');
            }
        });
    }
}

function detailsHTML(details, isOwner) {
    let html = `
        <img class="det-img" src="${details.img}" />
        <div class="desc">
            <h2 class="display-5">${details.title}</h2>
            <p class="infoType">Description:</p>
            <p class="idea-description">${details.description}</p>
        </div>
        `;
    if (isOwner) {
        html += `
            <div class="text-center">
                <a id="deleteBtn" class="btn detb" href="">Delete</a>
            </div>`;
    }
    return html;
}
