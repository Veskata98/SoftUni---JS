import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../services/authService.js';

const loginHandler = async (e, ctx) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get('email');
    const password = formData.get('password');

    await login(ctx, email, password);
};

const loginTemplate = (ctx) => html`
    <article>
        <h2>Login</h2>
        <form @submit="${(e) => loginHandler(e, ctx)}">
            <label>
                E-mail:
                <input type="text" name="email" />
            </label>
            <label>
                Password:
                <input type="password" name="password" />
            </label>
            <input type="submit" value="Login" />
        </form>
    </article>
`;

export const loginView = async (ctx) => {
    ctx.render(loginTemplate(ctx));
};
