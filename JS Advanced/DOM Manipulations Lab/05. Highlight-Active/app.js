function focused() {
  let divElements = document.querySelectorAll('div > div');
  Array.from(divElements).forEach((x) => {
    let inputField = x.children[1];
    inputField.addEventListener('focus', () => {
      x.setAttribute('class', 'focused');
    });
    inputField.addEventListener('blur', () => {
      x.removeAttribute('class', 'focused');
    });
  });
}
