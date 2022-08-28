import page from '../../node_modules/page/page.mjs';

import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { registerUser } from '../api/users.js';
import { mainElement, updateNav } from '../utils.js';

const registerTemplate = () => html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass" />
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
    </div>
`;

const registerHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    if (password === rePass && password.length > 0) {
        await registerUser(email, password);

        page.redirect('/');
    }
};

export const showRegister = () => {
    updateNav('/register');
    render(registerTemplate(), mainElement());

    document.querySelector('form').addEventListener('submit', registerHandler);
};
