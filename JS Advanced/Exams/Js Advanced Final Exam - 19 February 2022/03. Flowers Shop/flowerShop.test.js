import { flowerShop } from './flowerShop.js';
import { expect } from 'chai';

describe('flowerShop testing', () => {
    describe('calcPriceOfFlowers', () => {
        it('should throw error if first argument is not a string', () => {
            expect(() => flowerShop.calcPriceOfFlowers([], 5, 10)).to.throw(Error, 'Invalid input!');
        });
        it('should throw error if second argument is not a number', () => {
            expect(() => flowerShop.calcPriceOfFlowers('tulip', null, 10)).to.throw(Error, 'Invalid input!');
        });
        it('should throw error if third argument is not a number', () => {
            expect(() => flowerShop.calcPriceOfFlowers('tulip', 5, {})).to.throw(Error, 'Invalid input!');
        });
        it('should throw error if arguments includes a decimal number', () => {
            expect(() => flowerShop.calcPriceOfFlowers('tulip', 5, 5.3)).to.throw(Error, 'Invalid input!');
        });
        it('should return the price of the flowers', () => {
            expect(flowerShop.calcPriceOfFlowers('tulip', 5, 10)).to.equal('You need $50.00 to buy tulip!');
        });
    });
    describe('checkFlowersAvailable', () => {
        it('return available if flower exists in the array', () => {
            expect(flowerShop.checkFlowersAvailable('Rose', ['Rose', 'Lily', 'Orchid'])).to.equal(
                'The Rose are available!'
            );
        });
        it('return sold if flower does not exist in the array', () => {
            expect(flowerShop.checkFlowersAvailable('Tulip', ['Rose', 'Lily', 'Orchid'])).to.equal(
                'The Tulip are sold! You need to purchase more!'
            );
        });
    });
    describe('sellFlowers', () => {
        it('should throw error if first argument is not an array', () => {
            expect(() => flowerShop.sellFlowers('Roses', 1)).to.throw(Error, 'Invalid input!');
        });
        it('should throw error if second argument is not a integer', () => {
            expect(() => flowerShop.sellFlowers([], null)).to.throw(Error, 'Invalid input!');
        });
        it('should throw error if space index is decimal number', () => {
            expect(() => flowerShop.sellFlowers([], 1.5)).to.throw(Error, 'Invalid input!');
        });
        it('should throw error if space index is not in the length of the array', () => {
            expect(() => flowerShop.sellFlowers(['Rose', 'Lily', 'Orchid'], -1)).to.throw(Error, 'Invalid input!');
            expect(() => flowerShop.sellFlowers(['Rose', 'Lily', 'Orchid'], 4)).to.throw(Error, 'Invalid input!');
        });
        it('return the remaining flowers in the array joined by /', () => {
            expect(flowerShop.sellFlowers(['Rose', 'Lily', 'Orchid'], 0)).to.equal('Lily / Orchid');
        });
    });
});
