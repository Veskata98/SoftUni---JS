import { createIdea } from '../api/data.js';

const section = document.getElementById('create');
const form = section.querySelector('form');

form.addEventListener('submit', onCreateIdea);

let ctx = null;

export function showCreate(context) {
    ctx = context;
    context.showSection(section);
}

async function onCreateIdea(e) {
    e.preventDefault();
    const formData = new FormData(form);

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageURL');

    if (title.length >= 6 && description.length >= 10 && img.length >= 5) {
        await createIdea({ title, description, img });

        form.reset();
        ctx.goTo('/catalog');
    }
}
