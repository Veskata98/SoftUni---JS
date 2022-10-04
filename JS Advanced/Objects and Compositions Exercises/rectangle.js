function rectangle(w, h, c) {
    const obj = {
        width: w,
        height: h,
        color: c[0].toUpperCase() + c.slice(1),
        calcArea() {
            return this.width * this.height;
        }
    }

    return obj;
}



let rect = rectangle(4, 5, 'red');
console.log(rect.width);
console.log(rect.height);
console.log(rect.color);
console.log(rect.calcArea());
