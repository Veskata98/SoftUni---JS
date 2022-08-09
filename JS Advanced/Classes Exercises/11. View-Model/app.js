class Textbox {
    constructor(selector, regEx) {
        this._invalidSymbols = regEx;
        this._value = '';
        this._elements = document.querySelectorAll(selector);
    }
    get value() {
        return this._value;
    }
    set value(inputtedValue) {
        this._value = inputtedValue;
        Array.from(this.elements).forEach((x) => (x.value = this._value));
    }
    get elements() {
        return this._elements;
    }
    isValid() {
        return !this._invalidSymbols.test(this.value);
    }
}

let textbox = new Textbox('.textbox', /[^a-zA-Z0-9]/);

let inputs = document.getElementsByClassName('textbox');

Array.from(inputs).forEach((input) =>
    input.addEventListener('input', (e) => {
        textbox.value = e.target.value;
    })
);
