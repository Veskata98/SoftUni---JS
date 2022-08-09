const carService = require('./03. Car service_Resources');
const { expect } = require('chai');

describe('Car Service Test', () => {
    describe('Is it expensive function test', () => {
        it('testing with cheaper issue', () => {
            let service = carService.isItExpensive('Tire');
            expect(service).to.equal('The overall price will be a bit cheaper');
        });
        it('testing with Engine issue', () => {
            let service = carService.isItExpensive('Engine');
            expect(service).to.equal(`The issue with the car is more severe and it will cost more money`);
        });
        it('testing with Transmission issue', () => {
            let service = carService.isItExpensive('Transmission');
            expect(service).to.equal(`The issue with the car is more severe and it will cost more money`);
        });
    });
    describe('Discount function test', () => {
        it('should throw error if input is not valid', () => {
            expect(() => carService.discount('5', 5)).to.throw(Error, 'Invalid input');
            expect(() => carService.discount(5, '15')).to.throw(Error, 'Invalid input');
            expect(() => carService.discount('10', '15')).to.throw(Error, 'Invalid input');
        });
        it('should not apply discount for fewer or equal 2 parts', () => {
            expect(carService.discount(1, 50)).to.equal('You cannot apply a discount');
            expect(carService.discount(2, 50)).to.equal('You cannot apply a discount');
        });
        it('should apply 15% discount for when parts are 3 to 7 inclusive', () => {
            expect(carService.discount(3, 100)).to.equal('Discount applied! You saved 15$');
            expect(carService.discount(7, 10)).to.equal('Discount applied! You saved 1.5$');
        });
        it('should apply 30% discount for when parts are more than 7', () => {
            expect(carService.discount(10, 1000)).to.equal('Discount applied! You saved 300$');
            expect(carService.discount(20, 5000)).to.equal('Discount applied! You saved 1500$');
        });
    });
    describe('partsToBuy function test', () => {
        it('should throw error if input is not valid', () => {
            expect(() => carService.partsToBuy(5, ['Engine'])).to.throw(Error, 'Invalid input');
            expect(() => carService.partsToBuy(['Engine'], 'Tire')).to.throw(Error, 'Invalid input');
            expect(() => carService.partsToBuy('Engine', 'Tire')).to.throw(Error, 'Invalid input');
        });
        it('should return 0 if first parameter is empty array', () => {
            expect(carService.partsToBuy([], ['blowoff valve', 'injectors'])).to.equal(0);
        });
        it('test with 1 matched part', () => {
            let partToBuy = carService.partsToBuy(
                [
                    { part: 'blowoff valve', price: 145 },
                    { part: 'coil springs', price: 230 },
                ],
                ['blowoff valve', 'injectors']
            );
            expect(partToBuy).to.equal(145);
        });
        it('test with multiple matched parts', () => {
            let partToBuy = carService.partsToBuy(
                [
                    { part: 'blowoff valve', price: 145 },
                    { part: 'coil springs', price: 230 },
                    { part: 'engine', price: 1000 },
                    { part: 'tires', price: 250 },
                ],
                ['blowoff valve', 'coil springs', 'injectors', 'engine', 'tires']
            );
            expect(partToBuy).to.equal(1625);
        });
    });
});
