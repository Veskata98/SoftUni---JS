import { html, render } from '../node_modules/lit-html/lit-html.js';
import * as api from './api.js';

const menu = document.getElementById('menu');
const form = document.querySelector('form');

const menuTemplate = (options) => html` ${options.map((x) => html`<option value="${x._id}">${x.text}</option>`)} `;

const update = async () => {
    const options = await api.getOptions();
    const result = menuTemplate(options);
    render(result, menu);
};

const addItem = (e) => {
    e.preventDefault();
    const text = form.querySelector('#itemText').value;
    api.postData({ text });
    update();
};

form.addEventListener('submit', addItem);

update();
