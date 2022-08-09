function calc() {
  let firstEl = +document.getElementById("num1").value;
  let secondEl = +document.getElementById("num2").value;
  let sum = firstEl + secondEl;
  document.getElementById("sum").value = sum;
}
