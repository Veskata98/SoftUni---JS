function deleteByEmail() {
  let rows = document.querySelectorAll('tr td:nth-of-type(2)');
  let email = document.querySelector('[name="email"]').value;
  let resultElement = document.getElementById('result');

  let isDeleted = false;

  Array.from(rows).forEach((x) => {
    if (x.textContent === email) {
      console.log(x.parentNode.remove());
      isDeleted = true;
      return;
    }
  });
  if (isDeleted) {
    resultElement.textContent = 'Deleted.';
  } else {
    resultElement.textContent = 'Not found.';
  }
}
