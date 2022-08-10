function register() {
    const registerForm = document.getElementById('registerForm');
    const registerUrl = 'http://localhost:3030/users/register';

    registerForm.addEventListener('submit', registerHandler);

    async function registerHandler(e) {
        e.preventDefault();
        const formData = new FormData(registerForm);

        const email = formData.get('email');
        const password = formData.get('password');
        const rePass = formData.get('rePass');
        if (password.length > 0 && password !== rePass) {
            return alert('Password do not match!');
        }
        try {
            const registerResponse = await fetch(registerUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (!registerResponse.ok) {
                throw new Error(registerResponse.status + ' ' + registerResponse.statusText);
            }
            const responseData = await registerResponse.json();
            console.log(responseData);
            localStorage.setItem('email', responseData.email);
            localStorage.setItem('_id', responseData._id);
            localStorage.setItem('accessToken', responseData.accessToken);
            location.href = 'homeLogged.html';
        } catch (err) {
            alert(err);
        }
    }
}

register();
