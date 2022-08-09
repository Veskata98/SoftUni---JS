const PaymentPackage = require('./paymentPackage');
const { expect } = require('chai');

describe('Payment Package class testing', function () {
    describe('valid constructor', () => {
        it('should be correct if constructor is set with correct values', () => {
            let check = new PaymentPackage('Bills', 100);
            expect(check._name).to.equal('Bills');
            expect(check._value).to.equal(100);
            expect(check._VAT).to.equal(20);
            expect(check._active).to.be.true;
        });
    });
    describe('Check for initial name', () => {
        it('Should throw errow when name is number', () => {
            expect(() => new PaymentPackage(5, 5)).to.throw('Name must be a non-empty string');
        });

        it('Should throw errow when name is an array', () => {
            expect(() => new PaymentPackage(['asd'], 5)).to.throw('Name must be a non-empty string');
        });

        it('Should throw errow when name is empty string', () => {
            expect(() => new PaymentPackage('', 5)).to.throw('Name must be a non-empty string');
        });

        it('Should not throw error if name is correct', () => {
            expect(() => new PaymentPackage('asd', 5)).not.to.throw('Name must be a non-empty string');
        });
    });
    describe('Check for name change', () => {
        it('Should throw errow when name is not string', () => {
            let check = new PaymentPackage('Electricity Bills', 100);
            expect(() => (check.name = ['jeff'])).to.throw('Name must be a non-empty string');
        });
        it('Should not throw errow if new name is correct', () => {
            let check = new PaymentPackage('Electricity Bills', 100);
            expect(() => (check.name = 'Car Bills')).to.not.throw('Name must be a non-empty string');
        });
    });
    describe('Check for initial value', () => {
        it('Should throw errow when name is string', () => {
            expect(() => new PaymentPackage('asd', '5')).to.throw('Value must be a non-negative number');
        });

        it('Should throw errow when name is an array', () => {
            expect(() => new PaymentPackage('asd', [])).to.throw('Value must be a non-negative number');
        });

        it('Should throw errow when name is object', () => {
            expect(() => new PaymentPackage('asd', {})).to.throw('Value must be a non-negative number');
        });

        it('Should not throw error if value is correct', () => {
            expect(() => new PaymentPackage('asd', 5)).not.to.throw('Value must be a non-negative number');
        });
    });
    describe('Check for value change', () => {
        it('Should throw errow when value is not string', () => {
            let check = new PaymentPackage('Electricity Bills', 100);
            expect(() => (check.value = 'jeff')).to.throw('Value must be a non-negative number');
        });
        it('Should not throw errow when value is set to 0', () => {
            let check = new PaymentPackage('Electricity Bills', 100);
            expect(() => (check.value = 0)).to.not.throw('Value must be a non-negative number');
        });
        it('Should not throw errow if new value is correct', () => {
            let check = new PaymentPackage('Electricity Bills', 100);
            expect(() => (check.value = 150)).to.not.throw('Value must be a non-negative number');
        });
    });
    describe('Check for VAT setting value', () => {
        it('should throw error if VAT is negative number', () => {
            let check = new PaymentPackage('Electricity Bills', 100);
            expect(() => {
                check.VAT = -5;
            }).to.throw('VAT must be a non-negative number');
        });
        it('should throw error if VAT is not a number', () => {
            let check = new PaymentPackage('Electricity Bills', 100);
            expect(() => {
                check.VAT = 'ok';
            }).to.throw('VAT must be a non-negative number');
        });
        it('should return VAT value if it is set correct', () => {
            let check = new PaymentPackage('Electricity Bills', 100);
            check.VAT = 5;
            expect(check.VAT).to.equal(5);
        });
    });
    describe('Check for active setting value', () => {
        it('should throw error if active is not a boolean', () => {
            let check = new PaymentPackage('Electricity Bills', 100);
            expect(() => {
                check.active = 'isOk';
            }).to.throw('Active status must be a boolean');
        });
        it('should return active value if it boolean', () => {
            let check = new PaymentPackage('Electricity Bills', 100);
            check.active = true;
            expect(check.active).to.true;
        });
    });
    describe('Check toString return value', () => {
        it('Should return correct info', () => {
            let check = new PaymentPackage('Electricity Bills', 100);
            let result = [`Package: Electricity Bills`, `- Value (excl. VAT): 100`, `- Value (VAT 20%): 120`];
            expect(check.toString()).to.equal(result.join('\n'));
        });
        it('Should return correct info with changed VAT', () => {
            let check = new PaymentPackage('Electricity Bills', 100);
            check.VAT = 50;
            let result = [`Package: Electricity Bills`, `- Value (excl. VAT): 100`, `- Value (VAT 50%): 150`];
            expect(check.toString()).to.equal(result.join('\n'));
        });
        it('Should return correct info with active set to false', () => {
            let check = new PaymentPackage('Electricity Bills', 100);
            check.active = false;
            let result = [
                `Package: Electricity Bills (inactive)`,
                `- Value (excl. VAT): 100`,
                `- Value (VAT 20%): 120`,
            ];
            expect(check.toString()).to.equal(result.join('\n'));
        });
    });
});
