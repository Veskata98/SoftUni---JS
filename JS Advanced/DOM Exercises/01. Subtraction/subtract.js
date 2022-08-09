function subtract() {
  let firstElement = document.getElementById('firstNumber');
  let secondNumber = document.getElementById('secondNumber');
  let resultElement = document.getElementById('result');

  let sum = firstElement.value - secondNumber.value;

  resultElement.textContent = sum;
}
