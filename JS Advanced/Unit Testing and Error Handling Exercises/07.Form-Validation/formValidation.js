function validate() {
    let checkbox = document.getElementById('company');

    checkbox.addEventListener('change', (e) => {
        let companyInfo = document.getElementById('companyInfo');
        if (e.target.checked) {
            companyInfo.style.display = 'block';
        } else {
            companyInfo.style.display = 'none';
        }
    });

    let submit = document.getElementById('submit');
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        let usernameIsValid = false;
        let passIsValid = false;
        let confirmPassIsValid = false;
        let emailIsValid = false;

        let username = document.getElementById('username');
        let usernameRegEx = /^[A-Za-z0-9]{3,20}$/;
        if (usernameRegEx.test(username.value)) {
            username.style.borderColor = '';
            usernameIsValid = true;
        } else {
            username.removeAttribute('style');
            username.style.borderColor = 'red';
        }

        let emailRegEx = /^[^@.]+@[^@]*\.[^@]*$/;
        let email = document.getElementById('email');

        if (!emailRegEx.test(email.value)) {
            email.removeAttribute('style');
            email.style.borderColor = 'red';
        } else {
            email.style.borderColor = '';
            emailIsValid = true;
        }

        let password = document.getElementById('password');
        let passRegEx = /^[\w\d]{5,15}$/;

        if (passRegEx.test(password.value)) {
            password.style.borderColor = '';
            passIsValid = true;
        } else {
            password.removeAttribute('style');
            password.style.borderColor = 'red';
        }

        let confirmPass = document.getElementById('confirm-password');
        if (confirmPass.value !== password.value || !passRegEx.test(confirmPass.value)) {
            confirmPass.removeAttribute('style');
            password.removeAttribute('style');
            confirmPass.style.borderColor = 'red';
            password.style.borderColor = 'red';
        } else {
            confirmPass.style.borderColor = '';
            password.style.borderColor = '';
            confirmPassIsValid = true;
        }
        if (usernameIsValid && passIsValid && confirmPassIsValid && emailIsValid) {
            document.getElementById('valid').style.display = 'block';
        } else {
            document.getElementById('valid').style.display = 'none';
        }

        if (checkbox.checked) {
            let companyNumber = document.getElementById('companyNumber');
            let companyNumberIsValid = false;
            if (companyNumber.value >= 1000 && companyNumber.value <= 9999) {
                companyNumber.style.borderColor = '';
                companyNumberIsValid = true;
            } else {
                companyNumber.removeAttribute('style');
                companyNumber.style.borderColor = 'red';
            }
            if (usernameIsValid && passIsValid && confirmPassIsValid && emailIsValid && companyNumberIsValid) {
                document.getElementById('valid').style.display = 'block';
            } else {
                document.getElementById('valid').style.display = 'none';
            }
        }
    });
}
