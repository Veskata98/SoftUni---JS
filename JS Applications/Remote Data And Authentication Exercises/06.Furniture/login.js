function login() {
    const loginForm = document.getElementById('loginForm');
    const loginUrl = 'http://localhost:3030/users/login';

    loginForm.addEventListener('submit', loginHandler);

    async function loginHandler(e) {
        e.preventDefault();
        const formData = new FormData(loginForm);

        const email = formData.get('email');
        const password = formData.get('password');
        try {
            const loginRes = await fetch(loginUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!loginRes.ok) {
                throw new Error(loginRes.status + ' ' + loginRes.statusText);
            }

            const responseData = await loginRes.json();

            console.log(responseData);
            localStorage.setItem('username', responseData.username);
            localStorage.setItem('email', responseData.email);
            localStorage.setItem('_id', responseData._id);
            localStorage.setItem('accessToken', responseData.accessToken);

            location.href = 'homeLogged.html';
        } catch (err) {
            alert(err);
        }
    }
}

login();
