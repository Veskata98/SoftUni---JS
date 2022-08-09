function calculator() {
  return {
    init(n1, n2, result) {
      this.el1 = document.querySelector(n1);
      this.el2 = document.querySelector(n2);
      this.result = document.querySelector(result);
    },
    add() {
      this.result.value = Number(this.el1.value) + Number(this.el2.value);
    },
    subtract() {
      this.result.value = Number(this.el1.value) - Number(this.el2.value);
    },
  };
}

const calculate = calculator();
calculate.init('#num1', '#num2', '#result');
