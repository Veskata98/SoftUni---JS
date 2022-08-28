import { html, render } from '../node_modules/lit-html/lit-html.js';

const root = document.getElementById('root');
const form = document.querySelector('form');

form.addEventListener('submit', submitHandler);

const listTemplate = (towns) => html`
    <ul>
        ${towns != '' ? towns.map((t) => html`<li>${t}</li>`) : ''}
    </ul>
`;

function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const towns = formData.get('towns').trim().split(', ');

    update(listTemplate(towns));
}

function update(result) {
    render(result, root);
}
