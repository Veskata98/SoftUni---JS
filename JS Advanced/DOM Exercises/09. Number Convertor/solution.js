function solve() {
  let buttonEl = document.querySelector('#container > button');
  let resultEl = document.getElementById('result');

  let binaryEl = document.createElement('option');
  binaryEl.value = 'binary';
  binaryEl.textContent = 'Binary';

  let hexadecimalEl = document.createElement('option');
  hexadecimalEl.value = 'hexadecimal';
  hexadecimalEl.textContent = 'Hexadecimal';

  let selectMenuElement = document.querySelector('select#selectMenuTo');
  selectMenuElement.appendChild(binaryEl);
  selectMenuElement.appendChild(hexadecimalEl);

  buttonEl.addEventListener('click', () => {
    let number = +document.getElementById('input').value;

    let conversionType = document.getElementById('selectMenuTo');

    if (conversionType.value === 'binary') {
      number = number.toString(2);
      resultEl.value = number;
    } else if (conversionType.value === 'hexadecimal') {
      number = number.toString(16).toUpperCase();
      resultEl.value = number;
    } else {
      resultEl.value = null;
    }
  });
}
