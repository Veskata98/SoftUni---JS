function register() {
    const registerForm = document.querySelector('form');
    const registerUrl = 'http://localhost:3030/users/register';

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(registerForm);
        const { email, password, rePass } = Object.fromEntries(data);
        if (password === rePass && password.length > 0) {
            try {
                const response = await fetch(registerUrl, {
                    method: 'POST',
                    headers: {
                        'content-type': 'apllication/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log(responseData);
                    localStorage.setItem('accessToken', responseData.accessToken);

                    location.href = 'index.html';
                } else {
                    localStorage.clear();
                    registerForm.reset();
                }
            } catch (err) {
                console.error(err);
            }
        } else {
            alert('Password do not match!');
        }
    });
}

register();
