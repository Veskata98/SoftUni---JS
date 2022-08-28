import { html, render } from '../node_modules/lit-html/lit-html.js';

const tbody = document.querySelector('tbody');
const search = document.getElementById('searchField');

const url = 'http://localhost:3030/jsonstore/advanced/table';

const records = await getRecords();

const tableTemplate = (records) =>
    records.map(
        (x) => html`
            <tr id="${x._id}">
                <td>${`${x.firstName} ${x.lastName}`}</td>
                <td>${x.email}</td>
                <td>${x.course}</td>
            </tr>
        `
    );

function solve() {
    render(tableTemplate(records), tbody);
    const allRows = tbody.querySelectorAll('tr');

    document.querySelector('#searchBtn').addEventListener('click', onClick);

    function onClick() {
        allRows.forEach((row) => row.classList.remove('select'));

        const value = search.value.toLowerCase();
        allRows.forEach((row) => {
            if (row.textContent.toLowerCase().includes(value) && value != '') {
                row.classList.add('select');
            }
        });
        search.value = '';
    }
}

async function getRecords() {
    const response = await fetch(url);
    const data = await response.json();
    return Object.values(data);
}

solve();
