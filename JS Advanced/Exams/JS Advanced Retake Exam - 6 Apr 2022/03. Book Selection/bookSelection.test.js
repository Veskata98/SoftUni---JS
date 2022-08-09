const { expect } = require('chai');
const bookSelection = require('./bookSelection');

describe('Book Selection tests', function () {
    describe('isGenreSuitable function testing', function () {
        it('Should return statement if the book is Thriller and age is under 13', function () {
            expect(bookSelection.isGenreSuitable('Thriller', 12)).to.equal(
                'Books with Thriller genre are not suitable for kids at 12 age'
            );
            expect(bookSelection.isGenreSuitable('Thriller', 8)).to.equal(
                'Books with Thriller genre are not suitable for kids at 8 age'
            );
        });
        it('Should return statement if the book is Horror and age is under 13', function () {
            expect(bookSelection.isGenreSuitable('Horror', 12)).to.equal(
                'Books with Horror genre are not suitable for kids at 12 age'
            );
            expect(bookSelection.isGenreSuitable('Horror', 5)).to.equal(
                'Books with Horror genre are not suitable for kids at 5 age'
            );
        });
        it('Should return statement if the book is suitable', function () {
            expect(bookSelection.isGenreSuitable('Comics', 5)).to.equal('Those books are suitable');
            expect(bookSelection.isGenreSuitable('Adventure', 10)).to.equal('Those books are suitable');
        });
    });

    describe('isItAffordable function testing', function () {
        it('Should throw Error if first argument is not a number', function () {
            expect(() => bookSelection.isItAffordable('one', 12)).to.throw('Invalid input');
        });
        it('Should throw Error if second argument is not a number', function () {
            expect(() => bookSelection.isItAffordable(5, [])).to.throw('Invalid input');
        });
        it('Should return statement if budget is lower than price of the book', function () {
            expect(bookSelection.isItAffordable(10, 5)).to.equal("You don't have enough money");
        });
        it('Should return statement with the left bugdet if all data is correct', function () {
            expect(bookSelection.isItAffordable(5, 10)).to.equal('Book bought. You have 5$ left');
            expect(bookSelection.isItAffordable(10, 10)).to.equal('Book bought. You have 0$ left');
            expect(bookSelection.isItAffordable(7, 15.5)).to.equal('Book bought. You have 8.5$ left');
        });
    });

    describe('suitableTitles function testing', function () {
        it('Should return array with books with the wanted genre', function () {
            let result = bookSelection.suitableTitles(
                [
                    { title: 'The Da Vinci Code', genre: 'Thriller' },
                    { title: 'The Da Vinci Code 2', genre: 'Thriller' },
                    { title: 'Winnie The Pooh', genre: 'Kids' },
                ],
                'Thriller'
            );

            expect(result).to.include('The Da Vinci Code');
            expect(result).to.include('The Da Vinci Code 2');
            expect(result).to.not.include('Winnie The Pooh');
        });
        it('Should throw error if first argument is incorrect', function () {
            expect(() => bookSelection.suitableTitles(5, 'ok')).to.throw('Invalid input');
        });
        it('Should throw error if second argument is incorrect', function () {
            expect(() => bookSelection.suitableTitles([], 5)).to.throw('Invalid input');
        });
        it('Should return empty array if passed books have zero items', function () {
            expect(bookSelection.suitableTitles([], 'ok')).to.deep.equal([]);
        });
    });
});
