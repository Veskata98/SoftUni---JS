function bookLibrary() {
    const url = 'http://localhost:3030/jsonstore/collections/books';

    const loadBtn = document.getElementById('loadBooks');
    const form = document.querySelector('form');

    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    let id = '';

    loadBtn.addEventListener('click', renderBooks);
    form.addEventListener('submit', submitHandler);

    async function renderBooks() {
        const res = await fetch(url);
        const data = await res.json();

        tbody.innerHTML = '';

        Object.entries(data).forEach((x) => {
            const tableRow = createElement('tr', '', tbody);
            const tdTitle = createElement('td', x[1].title, tableRow);
            const tdAuthor = createElement('td', x[1].author, tableRow);
            const tdAction = createElement('td', '', tableRow);
            const editBtn = createElement('button', 'Edit', tdAction);
            const delBtn = createElement('button', 'Delete', tdAction);

            delBtn.addEventListener('click', async (e) => {
                e.target.parentNode.parentNode.remove();

                await fetch(`${url}/${x[0]}`, {
                    method: 'DELETE',
                });
            });

            editBtn.addEventListener('click', async () => {
                form.firstElementChild.textContent = 'Edit FORM';
                form.children[2].value = x[1].title;
                form.children[4].value = x[1].author;
                form.lastElementChild.textContent = 'Save';
                id = x[0];
            });
        });
    }

    async function submitHandler(e) {
        e.preventDefault();
        if (form.lastElementChild.textContent === 'Submit') {
            const title = form.children[2].value;
            const author = form.children[4].value;
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, author }),
            });
            loadBtn.click();
            form.reset();
        } else {
            const title = form.children[2].value;
            const author = form.children[4].value;
            await fetch(`${url}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, author }),
            }).finally(() => {
                id = '';

                form.firstElementChild.textContent = 'FORM';
                form.lastElementChild.textContent = 'Submit';

                loadBtn.click();
                form.reset();
            });
        }
    }

    function createElement(type, content, parentNode) {
        const element = document.createElement(type);

        if (content.length > 0) {
            element.textContent = content;
        }

        parentNode.appendChild(element);

        return element;
    }
}

bookLibrary();
