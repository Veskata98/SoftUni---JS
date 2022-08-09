class Person {
    constructor(f, l) {
        this.f = f;
        this.l = l;
    }
    get firstName() {
        return this.f;
    }
    set firstName(v) {
        this.f = v;
    }
    get lastName() {
        return this.l;
    }
    set lastName(v) {
        this.l = v;
    }
    get fullName() {
        return `${this.f} ${this.l}`;
    }
    set fullName(v) {
        let [f, l] = v.split(' ');
        this.f = f;
        this.l = l;
    }
}

let person = new Person('Peter', 'Ivanov');
console.log(person.fullName); //Peter Ivanov
person.firstName = 'George';
console.log(person.fullName); //George Ivanov
person.lastName = 'Peterson';
console.log(person.fullName); //George Peterson
person.fullName = 'Nikola Tesla';
console.log(person.firstName); //Nikola
console.log(person.lastName); //Tesla
