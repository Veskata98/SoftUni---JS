const email = localStorage.getItem('email');
const userId = localStorage.getItem('_id');
const userToken = localStorage.getItem('accessToken');

const baseUrl = 'http://localhost:3030/data/catches';

const loadBtn = document.querySelector('button.load');
const addBtn = document.querySelector('button.add');
const addForm = document.getElementById('addForm');

const catches = document.getElementById('catches');

if (email) {
    document.getElementById('guest').style.display = 'none';
    document.querySelector('p.email span').textContent = email;
    addBtn.disabled = false;
}

if (!email) {
    document.getElementById('user').style.display = 'none';
}

document.getElementById('logout').addEventListener('click', () => {
    localStorage.clear();
    location.href = 'index.html';
});

loadBtn.addEventListener('click', loadCatches);
addBtn.addEventListener('click', addCatch);

async function loadCatches(e) {
    const response = await fetch(baseUrl);
    const data = await response.json();

    catches.innerHTML = '';

    data.forEach((x) => {
        const canModify = userId === x._ownerId ? true : false;
        const divCatch = createElement('div', '', { class: 'catch' }, catches);
        const labelAngler = createElement('label', 'Angler', {}, divCatch);
        const inputAngler = createElement('input', '', { type: 'text', class: 'angler', value: x.angler }, divCatch);
        const labelWeight = createElement('label', 'Weight', {}, divCatch);
        const inputWeight = createElement('input', '', { type: 'text', class: 'weight', value: x.weight }, divCatch);
        const labelSpecies = createElement('label', 'Species', {}, divCatch);
        const inputSpecies = createElement('input', '', { type: 'text', class: 'species', value: x.species }, divCatch);
        const labelLocation = createElement('label', 'Location', {}, divCatch);
        const inputLocation = createElement(
            'input',
            '',
            { type: 'text', class: 'location', value: x.location },
            divCatch
        );
        const labelBait = createElement('label', 'Bait', {}, divCatch);
        const inputBait = createElement('input', '', { type: 'text', class: 'bait', value: x.bait }, divCatch);
        const labelcaptureTime = createElement('label', 'Capture Time', {}, divCatch);
        const inputcaptureTime = createElement(
            'input',
            '',
            { type: 'text', class: 'captureTime', value: x.captureTime },
            divCatch
        );
        const updateBtn = createElement('button', 'Update', { class: 'update', 'data-id': x._id }, divCatch);
        const delBtn = createElement('button', 'Delete', { class: 'delete', 'data-id': x._id }, divCatch);

        //check if current user is the owner of the catch
        if (!canModify) {
            Array.from(divCatch.querySelectorAll('input, button')).map((el) => el.setAttribute('disabled', ''));
        }

        delBtn.addEventListener('click', async () => {
            await fetch(`${baseUrl}/${x._id}`, {
                method: 'DELETE',
                headers: {
                    'X-Authorization': userToken,
                },
            });
            loadBtn.click();
        });

        updateBtn.addEventListener('click', async () => {
            await fetch(`${baseUrl}/${x._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': userToken,
                },
                body: JSON.stringify({
                    angler: inputAngler.value,
                    weight: inputWeight.value,
                    species: inputSpecies.value,
                    location: inputLocation.value,
                    bait: inputBait.value,
                    captureTime: inputcaptureTime.value,
                }),
            });
            loadBtn.click();
        });
    });
}

async function addCatch(e) {
    e.preventDefault();
    const addFormData = new FormData(addForm);
    const data = Object.fromEntries(addFormData);

    if (
        isNaN(data.angler) &&
        data.angler !== '' &&
        data.weight !== '' &&
        isNaN(data.species) &&
        data.species !== '' &&
        isNaN(data.location) &&
        data.location !== '' &&
        isNaN(data.bait) &&
        data.bait !== '' &&
        data.captureTime !== ''
    ) {
        await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Authorization': userToken },
            body: JSON.stringify(data),
        });
        addForm.reset();
        loadBtn.click();
    }
}

function createElement(type, content, attributes, parentNode) {
    const element = document.createElement(type);

    if (content) {
        element.textContent = content;
    }

    Object.entries(attributes).forEach((x) => element.setAttribute(x[0], x[1]));

    parentNode.appendChild(element);

    return element;
}
