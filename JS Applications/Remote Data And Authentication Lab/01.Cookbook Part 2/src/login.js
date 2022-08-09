function login() {
    const loginForm = document.querySelector('form');
    const loginUrl = 'http://localhost:3030/users/login';

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(loginForm);
        const { email, password } = Object.fromEntries(data);
        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'content-type': 'apllication/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const responseData = await response.json();
                localStorage.setItem('accessToken', responseData.accessToken);

                location.href = 'index.html';
            } else {
                localStorage.clear();
                loginForm.reset();
            }
        } catch (err) {
            console.error(err);
        }
    });
}

login();
