import { companyAdministration } from './companyAdministration.js';
import { expect } from 'chai';

describe('companyAdministration testing', function () {
    describe('hiringEmployee function testing', function () {
        it('throw error if position is not Programmer', function () {
            expect(() => companyAdministration.hiringEmployee('Vancho', 'Trader', 5)).to.throw(
                `We are not looking for workers for this position.`
            );
        });
        it('return not approved if years of experience are low', function () {
            expect(companyAdministration.hiringEmployee('Vancho', 'Programmer', 2)).to.equal(
                `Vancho is not approved for this position.`
            );
        });
        it('return approved if years of experience are enough', function () {
            expect(companyAdministration.hiringEmployee('Vancho', 'Programmer', 3)).to.equal(
                `Vancho was successfully hired for the position Programmer.`
            );
            expect(companyAdministration.hiringEmployee('Vancho', 'Programmer', 5)).to.equal(
                `Vancho was successfully hired for the position Programmer.`
            );
        });
    });
    describe('calculateSalary function testing', function () {
        it('throw error if argument is not a number', function () {
            expect(() => companyAdministration.calculateSalary(null)).to.throw('Invalid hours');
            expect(() => companyAdministration.calculateSalary(undefined)).to.throw('Invalid hours');
            expect(() => companyAdministration.calculateSalary([])).to.throw('Invalid hours');
            expect(() => companyAdministration.calculateSalary({})).to.throw('Invalid hours');
            expect(() => companyAdministration.calculateSalary('ok')).to.throw('Invalid hours');
        });
        it('throw error if argument is negative number', function () {
            expect(() => companyAdministration.calculateSalary(-5)).to.throw('Invalid hours');
        });
        it('return salary for given hours of work', function () {
            expect(companyAdministration.calculateSalary(100)).to.equal(1500);
            expect(companyAdministration.calculateSalary(160)).to.equal(2400);
            expect(companyAdministration.calculateSalary(0)).to.equal(0);
        });
        it('return salary for given hours of work + bonus if hours are over 160', function () {
            expect(companyAdministration.calculateSalary(161)).to.equal(3415);
        });
    });
    describe('firedEmployee function testing', function () {
        it('throw error if first argument is not an array', function () {
            expect(() => companyAdministration.firedEmployee('Vancho', 'Vancho')).to.throw('Invalid input');
        });
        it('throw error if second argument is not a valid index', function () {
            expect(() => companyAdministration.firedEmployee(['Petar', 'Ivan', 'George'], -1)).to.throw(
                'Invalid input'
            );
            expect(() => companyAdministration.firedEmployee(['Petar', 'Ivan', 'George'], 3)).to.throw('Invalid input');
            expect(() => companyAdministration.firedEmployee(['Petar', 'Ivan', 'George'], 4)).to.throw('Invalid input');
            expect(() => companyAdministration.firedEmployee(['Petar', 'Ivan', 'George'], [])).to.throw(
                'Invalid input'
            );
            expect(() => companyAdministration.firedEmployee(['Petar', 'Ivan', 'George'], null)).to.throw(
                'Invalid input'
            );
            expect(() => companyAdministration.firedEmployee(['Petar', 'Ivan', 'George'], 'ok')).to.throw(
                'Invalid input'
            );
        });
        it('return salary for given hours of work', function () {
            expect(companyAdministration.firedEmployee(['Petar', 'Ivan', 'George'], 2)).to.equal('Petar, Ivan');
        });
    });
});
