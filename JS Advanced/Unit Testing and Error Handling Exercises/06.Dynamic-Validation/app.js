function validate() {
    let email = document.getElementById('email');
    email.addEventListener('change', (e) => {
        let emailRegEx = /^[a-z]+\@[a-z]+\.[a-z]+$/;
        if (!emailRegEx.test(e.target.value)) {
            e.target.classList.add('error');
        } else {
            e.target.classList.remove('error');
        }
    });
}
