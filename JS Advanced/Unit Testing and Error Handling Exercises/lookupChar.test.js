const lookupChar = require('./lookupChar');
const { expect } = require('chai');

describe('char look up function testing', () => {
    it('should return undefined if first argument is not a string', () => {
        expect(lookupChar(5, 5)).to.be.undefined;
    });
    it('should return undefined if second argument is not a number', () => {
        expect(lookupChar('simpleString', 'first')).to.be.undefined;
    });
    it('should return undefined if second argument is decimal number', () => {
        expect(lookupChar('simpleString', 5.1)).to.be.undefined;
    });
    it('should return "Incorrect index" if second argument is index below zero', () => {
        expect(lookupChar('simpleString', -1)).to.be.equal('Incorrect index');
    });
    it('should return "Incorrect index" if second argument is index more than the length of the string', () => {
        expect(lookupChar('simpleString', 20)).to.be.equal('Incorrect index');
    });
    it('should return "s" if both arguments are passed correctly', () => {
        expect(lookupChar('simpleString', 0)).to.be.equal('s');
    });
    it('should return "g" if both arguments are passed correctly', () => {
        expect(lookupChar('simpleString', 11)).to.be.equal('g');
    });
});
