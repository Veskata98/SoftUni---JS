(function solve() {
    Array.prototype.last = function () {
        return this[this.length - 1];
    };
    Array.prototype.skip = function (n) {
        let newArr = new Array();
        newArr = this.slice(n);
        return newArr;
    };
    Array.prototype.take = function (n) {
        let newArr = new Array();
        newArr = this.slice(0, n);
        return newArr;
    };
    Array.prototype.sum = function () {
        return this.reduce((a, x) => a + x, 0);
    };
    Array.prototype.average = function () {
        return this.reduce((a, x) => a + x, 0) / this.length;
    };
})();

let arr = [1, 2, 3, 4, 5, 6];

console.log(arr.last());
console.log(arr);
console.log(arr.skip(3));
console.log(arr.take(2));
console.log(arr.sum());
console.log(arr.average());
