function solve() {
    let unitValues = {
        m: 0.01,
        cm: 1,
        mm: 10,
    };
    class Figure {
        constructor() {
            this.units = 'cm';
            this._area = 0;
        }
        get area() {
            return this._area;
        }
        changeUnits(value) {
            this.units = value;
        }
    }
    class Circle extends Figure {
        constructor(radius) {
            super();
            this.radius = radius;
            this._area = Math.PI * this.radius ** 2;
        }
        toString() {
            return `Figures units: ${this.units} Area: ${this.area} - radius: ${this.radius}`;
        }
    }

    class Rectangle extends Figure {
        constructor(width, height, units) {
            super();
            this.width = width;
            this.height = height;
            this.units = units;
            this._width = width;
            this._height = height;
            if (this.units === 'mm') {
                this.width *= 10;
                this.height *= 10;
                this._area = this.height * this.width;
            } else if (this.units === 'm') {
                this.width /= 100;
                this.height /= 100;
                this._area = this.height * this.width;
            } else {
                this._area = this.height * this.width;
            }
        }
        toString() {
            return `Figures units: ${this.units} Area: ${this.area} - width: ${this.width}, height: ${this.height}`;
        }
    }
    Rectangle.prototype.changeUnits = function (value) {
        this.units = value;
        this.width = this._width * unitValues[value];
        this.height = this._height * unitValues[value];
        this._area = this.width * this.height;
    };

    let r = new Rectangle(3, 4, 'mm');
    console.log(r.area); // 1200
    console.log(r.toString()); //Figures units: mm Area: 1200 - width: 30, height: 40

    r.changeUnits('cm');
    console.log(r.area); // 12
    console.log(r.toString()); // Figures units: cm Area: 12 - width: 3, height: 4

    // c.changeUnits('mm');
    // console.log(c.area); // 7853.981633974483
    // console.log(c.toString()); // Figures units: mm Area: 7853.981633974483 - radius: 50

    let classes = {
        Figure,
        Circle,
        Rectangle,
    };

    return classes;
}

solve();
