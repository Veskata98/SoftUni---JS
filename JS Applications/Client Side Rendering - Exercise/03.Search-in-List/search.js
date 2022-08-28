import { html, render } from '../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

const townsElement = document.getElementById('towns');
const input = document.getElementById('searchText');
const button = document.querySelector('button');
const resultDiv = document.getElementById('result');

let count = 0;

const townTemplate = (towns, match) => html`
    <ul>
        ${towns.map((x) => {
            if (x.toLowerCase().includes(match)) {
                count++;
                return html`<li class="active">${x}</li>`;
            } else {
                return html`<li>${x}</li>`;
            }
        })}
    </ul>
`;

function search(match) {
    const result = townTemplate(towns, match);
    render(result, townsElement);
}

button.addEventListener('click', () => {
    const match = input.value.toLowerCase();

    match == '' ? search() : search(match);

    resultDiv.textContent = `${count} matches found`;
    count = 0;
});

search();
