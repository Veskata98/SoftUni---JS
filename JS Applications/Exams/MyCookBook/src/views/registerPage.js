import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../services/authService.js';

const registerHandler = async (e, ctx) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    if (email.length == 0 || password.length == 0 || rePass.length == 0) {
        alert('Please fill all fields');
    } else if (password !== rePass) {
        alert('Password do not match');
    } else {
        await register(ctx, email, password);
    }
};

const registerTemplate = (ctx) => html`
    <article>
        <h2>Register</h2>
        <form @submit=${(e) => registerHandler(e, ctx)}>
            <label>
                E-mail:
                <input type="text" name="email" />
            </label>
            <label>
                Password:
                <input type="password" name="password" />
            </label>
            <label>
                Repeat:
                <input type="password" name="rePass" />
            </label>
            <input type="submit" value="Register" />
        </form>
    </article>
`;

export const registerView = async (ctx) => {
    ctx.render(registerTemplate(ctx));
};
