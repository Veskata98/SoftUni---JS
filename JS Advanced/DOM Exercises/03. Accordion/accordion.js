function toggle() {
  let textElement = document.getElementById('extra');
  let buttonText = document.querySelector('.head .button');
  console.log(buttonText);
  if (textElement.style.display === 'block') {
    textElement.style.display = 'none';
    buttonText.textContent = 'More';
  } else {
    textElement.style.display = 'block';
    buttonText.textContent = 'Less';
  }
}
