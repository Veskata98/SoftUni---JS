import { html, render } from '../node_modules/lit-html/lit-html.js';

const body = document.querySelector('body');

const url = 'http://localhost:3030/jsonstore/collections/books';

const getBooks = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const renderBooks = (books) =>
    Object.values(books).map(
        (x) => html` <tr id="${x._id}">
            <td>${x.title}</td>
            <td>${x.author}</td>
            <td>
                <button @click="${editBook}">Edit</button>
                <button @click="${() => deleteBook(x._id)}">Delete</button>
            </td>
        </tr>`
    );

const loadBooks = async () => {
    const tbody = document.querySelector('tbody');
    const books = await getBooks();
    Object.entries(books).forEach((x) => (x[1]._id = x[0]));

    render(renderBooks(books), tbody);
};

let editing = false;

const page = () => html` <button @click="${loadBooks}" id="loadBooks">LOAD ALL BOOKS</button>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>

    ${editing
        ? html` <form id="edit-form">
              <input type="hidden" name="id" />
              <h3>Edit book</h3>
              <label>TITLE</label>
              <input type="text" name="title" placeholder="Title..." />
              <label>AUTHOR</label>
              <input type="text" name="author" placeholder="Author..." />
              <input type="submit" value="Save" />
          </form>`
        : html` <form id="add-form">
              <h3>Add book</h3>
              <label>TITLE</label>
              <input type="text" name="title" placeholder="Title..." />
              <label>AUTHOR</label>
              <input type="text" name="author" placeholder="Author..." />
              <input type="submit" value="Submit" />
          </form>`}`;

const editBook = (e) => {
    editing = true;
    update();

    const row = e.currentTarget.parentNode.parentNode;

    const editForm = document.getElementById('edit-form');

    const edditedTitle = editForm.querySelector('input[name="title"]');
    edditedTitle.value = row.children[0].textContent;

    const edditedAuthor = editForm.querySelector('input[name="author"]');
    edditedAuthor.value = row.children[1].textContent;

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (edditedTitle.value.trim() != '' && edditedAuthor.value.trim() != '') {
            await fetch(`${url}/${row.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    author: edditedAuthor.value,
                    title: edditedTitle.value,
                }),
            });

            editing = false;
            update();
            loadBooks();
        }
    });
};

const deleteBook = async (id) => {
    const choice = confirm('Are you sure yo uwant to delete this book?');
    if (choice) {
        await fetch(`${url}/${id}`, {
            method: 'DELETE',
        });
        loadBooks();
    }
};

const update = () => {
    render(page(), body);
};

update();

const addForm = document.getElementById('add-form');
addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addForm);
    const title = formData.get('title');
    const author = formData.get('author');
    if (title.trim() != '' && author.trim() != '') {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                author,
                title,
            }),
        });
        addForm.reset();
        loadBooks();
    }
});
