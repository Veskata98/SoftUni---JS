function validate() {
  let emailElement = document.getElementById('email');
  let email = '';

  emailElement.addEventListener('change', (e) => {
    email = e.currentTarget.value;
    if (!/^[a-z]+\@[a-z]+\.[a-z]+$/.test(email)) {
      emailElement.setAttribute('class', 'error');
    } else {
      emailElement.removeAttribute('class', 'error');
    }
  });
}

// function validate() {
//   let reg = /^([\w\-.]+)@([a-z]+)(\.[a-z]+)+$/;
//   let inputElement = document.getElementById('email');
//   let value = inputElement.value;

//   inputElement.addEventListener('change', checkEmail);

//   function checkEmail(event) {
//     if (reg.test(event.target.value)) {
//       event.target.removeAttribute('class');
//       return;
//     }

//     event.target.className = 'error';
//   }
// }
