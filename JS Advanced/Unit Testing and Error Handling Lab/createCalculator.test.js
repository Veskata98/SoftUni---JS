const { assert, expect } = require('chai');
const createCalculator = require('./createCalculator');

describe('check for calculator function', () => {
    it('should return 0 if initial value is not changed', () => {
        expect(createCalculator().get()).to.be.equal(0);
    });
    it('should return undefined if add value is not a number', () => {
        let calc = createCalculator();
        calc.add('number');
        expect(calc.get()).to.be.NaN;
    });
    it('should return undefined if subtract value is not a number', () => {
        let calc = createCalculator();
        calc.subtract({});
        expect(calc.get()).to.be.NaN;
    });
    it('should return initial value (0) + added value (5) => 5', () => {
        let added5 = createCalculator();
        added5.add(5);
        expect(added5.get()).to.be.equal(5);
    });
    it('should return initial value (0) - subtracted value (5) => -5', () => {
        let subtraced5 = createCalculator();
        subtraced5.subtract(5);
        expect(subtraced5.get()).to.be.equal(-5);
    });
});
