import { html, render } from '../node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

cats.forEach((c) => (c.toggle = false));

const main = document.querySelector('#allCats');

const listTemplate = (cats) => html`
    <ul>
        ${cats.map(
            (cat) =>
                html` <li>
                    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap" />
                    <div class="info">
                        <button @click="${() => toggleHnadler(cat)}" class="showBtn">
                            ${cat.toggle ? 'Hide' : 'Show'} status code
                        </button>
                        <div class="status ${cat.toggle ? 'visible' : 'hidden'}" id="${cat.id}">
                            <h4>Status Code: ${cat.statusCode}</h4>
                            <p>${cat.statusMessage}</p>
                        </div>
                    </div>
                </li>`
        )}
    </ul>
`;

function toggleHnadler(cat) {
    cat.toggle = !cat.toggle;
    update();
}

function update() {
    const result = listTemplate(cats);
    render(result, main);
}

update();
