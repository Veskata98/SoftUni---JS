const mathEnforcer = require('./mathEnforcer');
const { expect } = require('chai');

describe('math enforcer function testing', () => {
    describe('addFive function testing', () => {
        it('should return undefined if argument is not a number', () => {
            expect(mathEnforcer.addFive('five')).to.be.undefined;
        });
        it('should return undefined if argument is not a number', () => {
            expect(mathEnforcer.addFive([])).to.be.undefined;
        });
        it('should return undefined if argument is not a number', () => {
            expect(mathEnforcer.addFive(undefined)).to.be.undefined;
        });
        it('should return 10 if argument is 5', () => {
            expect(mathEnforcer.addFive(5)).to.be.equal(10);
        });
        it('should return 2 if argument is -3', () => {
            expect(mathEnforcer.addFive(-3)).to.be.equal(2);
        });
        it('should return -2 if argument is -7', () => {
            expect(mathEnforcer.addFive(-7)).to.be.equal(-2);
        });
        it('should return 7.23 if argument is 2.23', () => {
            expect(mathEnforcer.addFive(2.23)).to.be.closeTo(7.23, 0.01);
        });
        it('should return -4.4 if argument is -9.4', () => {
            expect(mathEnforcer.addFive(-9.4)).to.be.closeTo(-4.4, 0.01);
        });
    });
    describe('subtractTen function testing', () => {
        it('should return undefined if argument is not a number', () => {
            expect(mathEnforcer.subtractTen('five')).to.be.undefined;
        });
        it('should return undefined if argument is not a number', () => {
            expect(mathEnforcer.subtractTen({})).to.be.undefined;
        });
        it('should return 10 if argument is 20', () => {
            expect(mathEnforcer.subtractTen(20)).to.be.equal(10);
        });
        it('should return -12 if argument is -2', () => {
            expect(mathEnforcer.subtractTen(-2)).to.be.equal(-12);
        });
        it('should return 0 if argument is 10', () => {
            expect(mathEnforcer.subtractTen(10)).to.be.equal(0);
        });
        it('should return 5.5 if argument is 15.5', () => {
            expect(mathEnforcer.subtractTen(15.5)).to.be.closeTo(5.5, 0.01);
        });
        it('should return -1.2 if argument is 8.8', () => {
            expect(mathEnforcer.subtractTen(8.8)).to.be.closeTo(-1.2, 0.01);
        });
    });
    describe('sum function testing', () => {
        it('should return undefined if first argument is not a number', () => {
            expect(mathEnforcer.sum('one', 1)).to.be.undefined;
        });
        it('should return undefined if second argument is not a number', () => {
            expect(mathEnforcer.sum(1, 'one')).to.be.undefined;
        });
        it('should return 23 if arguments are 11 and 12', () => {
            expect(mathEnforcer.sum(11, 12)).to.be.equal(23);
        });
        it('should return -5 if arguments are 10 and -15', () => {
            expect(mathEnforcer.sum(10, -15)).to.be.equal(-5);
        });
        it('should return 5.1 if arguments are 1.8 and 3.3', () => {
            expect(mathEnforcer.sum(1.8, 3.3)).to.be.closeTo(5.1, 0.01);
        });
        it('should return -10.6 if arguments are 10 and -20.6', () => {
            expect(mathEnforcer.sum(10, -20.6)).to.be.closeTo(-10.6, 0.01);
        });
        it('should return -10 if arguments are -5 and -5', () => {
            expect(mathEnforcer.sum(-5, -5)).to.be.closeTo(-10, 0.01);
        });
    });
});
