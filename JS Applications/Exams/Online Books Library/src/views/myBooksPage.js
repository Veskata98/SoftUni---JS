import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';

const bookLiTemplate = (book) => html`
    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <a class="button" href="details/${book._id}">Details</a>
    </li>
`;

const booksTemplate = (books) => html`
        <section id="my-books-page" class="my-books">
            <h1>My Books</h1>
       
            ${books.length == 0 
                ? html` <p class="no-books">No books in database!</p>`
                : html` 
                    <ul class="my-books-list">
                        ${books.map(bookLiTemplate)}
                    </ul>`
            }
                    
        </section>
`;


export const myBooksView = async (ctx) => {
    const user = ctx.user;
    const books = await dataService.getMyBooks(user._id);

    ctx.render(booksTemplate(books));
}