function solve() {
  let textElement = document.getElementById('text');
  let conventionElement = document.getElementById('naming-convention');
  let resultElement = document.getElementById('result');

  if (conventionElement.value === 'Pascal Case') {
    let finalText = textElement.value
      .toLowerCase()
      .split(' ')
      .map((x) => (x = x.charAt(0).toUpperCase() + x.slice(1)))
      .join('');

    resultElement.textContent = finalText;
  } else if (conventionElement.value === 'Camel Case') {
    let finalText = textElement.value.toLowerCase().split(' ');
    let firstWord = finalText.shift();
    finalText = finalText
      .map((x) => (x = x.charAt(0).toUpperCase() + x.slice(1)))
      .join('');

    resultElement.textContent = firstWord + finalText;
  } else {
    resultElement.textContent = 'Error!';
  }
}
