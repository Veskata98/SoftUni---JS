class LibraryCollection {
    constructor(capacity) {
        this.capacity = capacity;
        this.books = [];
    }
    addBook(bookName, bookAuthor) {
        if (this.books.length == this.capacity) {
            throw new Error('Not enough space in the collection.');
        }

        this.books.push({ bookName, bookAuthor, payed: false });
        return `The ${bookName}, with an author ${bookAuthor}, collect.`;
    }
    payBook(bookName) {
        let bookToBePayed = this.books.find((book) => book.bookName === bookName);
        if (!bookToBePayed) {
            throw new Error(`${bookName} is not in the collection.`);
        } else if (bookToBePayed.payed == true) {
            throw new Error(`${bookName} has already been paid.`);
        }
        bookToBePayed.payed = true;
        return `${bookName} has been successfully paid.`;
    }
    removeBook(bookName) {
        let bookToBeRemoved = this.books.find((book) => book.bookName === bookName);
        if (!bookToBeRemoved) {
            throw new Error("The book, you're looking for, is not found.");
        } else if (bookToBeRemoved.payed == false) {
            throw new Error(`${bookName} need to be paid before removing from the collection.`);
        }

        this.books = this.books.filter((book) => book !== bookToBeRemoved);
        return `${bookName} remove from the collection.`;
    }
    getStatistics(bookAuthor) {
        if (arguments.length == 0) {
            let allBooks = [`The book collection has ${this.capacity - this.books.length} empty spots left.`];
            this.books
                .sort((a, b) => a.bookName.localeCompare(b.bookName))
                .forEach((book) =>
                    allBooks.push(`${book.bookName} == ${book.bookAuthor} - ${book.payed ? 'Has Paid' : 'Not Paid'}.`)
                );
            return allBooks.join('\n');
        } else {
            if (!this.books.some((book) => book.bookAuthor === bookAuthor)) {
                throw new Error(`${bookAuthor} is not in the collection.`);
            }
            let authorBooks = [];
            this.books
                .filter((book) => book.bookAuthor === bookAuthor)
                .forEach((book) =>
                    authorBooks.push(
                        `${book.bookName} == ${book.bookAuthor} - ${book.payed ? 'Has Paid' : 'Not Paid'}.`
                    )
                );
            return authorBooks.join('\n');
        }
    }
}

const library = new LibraryCollection(5);
library.addBook('Don Quixote', 'Miguel de Cervantes');
library.payBook('Don Quixote');
library.addBook('In Search of Lost Time', 'Marcel Proust');
library.addBook('Ulysses', 'James Joyce');
console.log(library.getStatistics());
