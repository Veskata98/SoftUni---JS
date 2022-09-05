import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../services/userService.js';

const loginTemplate = (loginHandler) => html`
    <section id="login-page" class="login">
        <form id="login-form" @submit=${loginHandler} method="POST">
            <fieldset>
                <legend>Login Form</legend>
                <p class="field">
                    <label for="email">Email</label>
                    <span class="input">
                        <input type="text" name="email" id="email" placeholder="Email">
                    </span>
                </p>
                <p class="field">
                    <label for="password">Password</label>
                    <span class="input">
                        <input type="password" name="password" id="password" placeholder="Password">
                    </span>
                </p>
                <input class="button submit" type="submit" value="Login">
            </fieldset>
        </form>
    </section>
`;


export const loginView = (ctx) => {

    const loginHandler = async (e) => {
        e.preventDefault();
        const { ...data } = Object.fromEntries(new FormData(e.currentTarget));

        if (!Object.values(data).some(x => x == '')) {
            await login(data);
            ctx.page.redirect('/');
        } else {
            alert('Please fill all fields')
        }
    }

    ctx.render(loginTemplate(loginHandler));
}

