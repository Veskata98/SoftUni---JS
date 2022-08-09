// const isOddOrEven = require('./evenOrOdd');
// const { expect } = require('chai');

// describe('even or odd function testing', () => {
//     it('should return undefined if argument is number', () => {
//         expect(isOddOrEven(5)).to.be.undefined;
//     });
//     it('should return undefined if argument is object', () => {
//         expect(isOddOrEven({})).to.be.undefined;
//     });
//     it('should return undefined if argument is array', () => {
//         expect(isOddOrEven([])).to.be.undefined;
//     });
//     it('should return undefined if argument is null', () => {
//         expect(isOddOrEven(null)).to.be.undefined;
//     });
//     it('should return undefined if argument is undefined', () => {
//         expect(isOddOrEven(undefined)).to.be.undefined;
//     });
//     it('should return "even" if string length is even', () => {
//         expect(isOddOrEven('ok')).to.be.equal('even');
//     });
//     it('should return "even" if string length is 0', () => {
//         expect(isOddOrEven('')).to.be.equal('even');
//     });
//     it('should return "odd" if string length is odd', () => {
//         expect(isOddOrEven('pizza')).to.be.equal('odd');
//     });

// });

fetch('https://swapi.dev/api/people/1').then((res) => console.log(res));
