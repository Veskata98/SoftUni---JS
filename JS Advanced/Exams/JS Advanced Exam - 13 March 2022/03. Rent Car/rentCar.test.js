const rentCar = require('./rentCar');
const { expect } = require('chai');

describe('RentCar testing', function () {
    describe('searchCar funcion testing ', function () {
        it('should throw error if first argument is not an array', () => {
            expect(() => {
                rentCar.searchCar('Opel', 'Opel');
            }).to.throw(Error, 'Invalid input!');
        });
        it('should throw error if second argument is not a string', () => {
            expect(() => {
                rentCar.searchCar([], {});
            }).to.throw(Error, 'Invalid input!');
        });
        it('should throw error if desired model does not exist in array', () => {
            expect(() => {
                rentCar.searchCar(['Audi', 'Volkswagen', 'BMW', 'Audi'], 'Opel');
            }).to.throw(Error, 'There are no such models in the catalog!');
        });
        it('should return number of matching cars of the desired model', () => {
            const result = rentCar.searchCar(['Audi', 'Volkswagen', 'BMW', 'Audi'], 'Audi');
            expect(result).to.equal(`There is 2 car of model Audi in the catalog!`);
        });
    });
    describe('calculatePriceOfCar funcion testing ', function () {
        it('should throw error if first argument is not a string', () => {
            expect(() => {
                rentCar.calculatePriceOfCar('Opel', ['15']);
            }).to.throw(Error, 'Invalid input!');
        });
        it('should throw error if second argument is not a number', () => {
            expect(() => {
                rentCar.calculatePriceOfCar({}, 10);
            }).to.throw(Error, 'Invalid input!');
        });
        it('should throw error if model is not in the catalogue', () => {
            expect(() => {
                rentCar.calculatePriceOfCar('Ferrari', 3);
            }).to.throw(Error, 'No such model in the catalog!');
        });
        it('should return the price for renting the car', () => {
            const result = rentCar.calculatePriceOfCar('Mercedes', 5);
            expect(result).to.equal(`You choose Mercedes and it will cost $250!`);
        });
    });
    describe('checkBudget funcion testing ', function () {
        it('should throw error if first argument is not a number', () => {
            expect(() => {
                rentCar.checkBudget('ok', 10, 500);
            }).to.throw(Error, 'Invalid input!');
        });
        it('should throw error if second argument is not a number', () => {
            expect(() => {
                rentCar.checkBudget(50, [], 500);
            }).to.throw(Error, 'Invalid input!');
        });
        it('should throw error if third argument is not a number', () => {
            expect(() => {
                rentCar.checkBudget(30, 10, {});
            }).to.throw(Error, 'Invalid input!');
        });
        it('should throw error if arguments are decimal numbers', () => {
            expect(() => {
                rentCar.checkBudget(30.5, 3.12, 570.56);
            }).to.throw(Error, 'Invalid input!');
        });
        it('should return that you can rent the car', () => {
            const result = rentCar.checkBudget(50, 3, 200);
            expect(result).to.equal('You rent a car!');
        });
        it('should return that you can rent the car if you are left with 0 dollars', () => {
            const result = rentCar.checkBudget(50, 3, 150);
            expect(result).to.equal('You rent a car!');
        });
        it('should return that you need bigger budget', () => {
            const result = rentCar.checkBudget(50, 3, 100);
            expect(result).to.equal('You need a bigger budget!');
        });
    });
});
