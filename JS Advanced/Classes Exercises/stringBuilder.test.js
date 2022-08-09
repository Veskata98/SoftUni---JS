const StringBuilder = require('./stringBuilder');
const { expect } = require('chai');

describe('String builder class testing', function () {
    describe('valid constructor', () => {
        it('without functions applied', () => {
            let check = new StringBuilder('alright');
            expect(check.toString()).to.equal('alright');
        });
        it('with empty string', () => {
            let check = new StringBuilder('');
            expect(check.toString()).to.equal('');
        });
        it('with multiple functions', () => {
            let check = new StringBuilder('hello');
            check.append(', there');
            check.prepend('User, ');
            check.insertAt('woop', 5);
            check.remove(6, 3);
            expect(check.toString()).to.equal('User,w hello, there');
        });
    });
    describe('adding strings to the initial string', () => {
        it('append fucntion', () => {
            let check = new StringBuilder('alright');
            check.append('55');
            expect(check.toString()).to.equal('alright55');
        });
        it('prepend fucntion', () => {
            let check = new StringBuilder('alright');
            check.prepend('55');
            expect(check.toString()).to.equal('55alright');
        });
        it('prepend fucntion', () => {
            let check = new StringBuilder('alright');
            check.insertAt(' mister', 7);
            expect(check.toString()).to.equal('alright mister');
        });
    });
    describe('remove function validator', () => {
        it('remove fucntion', () => {
            let check = new StringBuilder('alright');
            check.remove(0, 3);
            expect(check.toString()).to.equal('ight');
        });
    });
    describe('validator for not string arguments', () => {
        it('should throw error if initial value is not a string', () => {
            expect(() => {
                new StringBuilder(10);
            }).to.throw('Argument must be a string');
        });
        it('should throw error if append value is not a string', () => {
            let check = new StringBuilder('alright');
            expect(() => {
                check.append([]);
            }).to.throw('Argument must be a string');
        });
        it('should throw error if prepend value is not a string', () => {
            let check = new StringBuilder('alright');
            expect(() => {
                check.prepend({});
            }).to.throw('Argument must be a string');
        });
        it('should throw error if insert at first parameter is not a string', () => {
            let check = new StringBuilder('alright');
            expect(() => {
                check.insertAt(['yes'], 1);
            }).to.throw('Argument must be a string');
        });
    });
});
