import page from '../../node_modules/page/page.mjs';

import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { loginUser } from '../api/users.js';
import { mainElement, updateNav } from '../utils.js';

const logintemplate = () => html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Login User</h1>
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
                    <input type="submit" class="btn btn-primary" value="Login" />
                </div>
            </div>
        </form>
    </div>
`;

const loginHanlder = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get('email');
    const password = formData.get('password');

    await loginUser(email, password);

    page.redirect('/');
};

export const showLogin = () => {
    updateNav('/login');
    render(logintemplate(), mainElement());

    document.querySelector('form').addEventListener('submit', loginHanlder);
};
