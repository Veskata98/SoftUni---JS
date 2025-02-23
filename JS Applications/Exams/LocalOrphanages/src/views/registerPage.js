import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../services/userService.js';

const registerTemplate = (registerHandler) => html`
    <section id="register-page" class="auth">
        <form id="register" @submit=${registerHandler} method="POST">
            <h1 class="title">Register</h1>
    
            <article class="input-group">
                <label for="register-email">Email: </label>
                <input type="email" id="register-email" name="email">
            </article>
    
            <article class="input-group">
                <label for="register-password">Password: </label>
                <input type="password" id="register-password" name="password">
            </article>
    
            <article class="input-group">
                <label for="repeat-password">Repeat Password: </label>
                <input type="password" id="repeat-password" name="repeatPassword">
            </article>
    
            <input type="submit" class="btn submit-btn" value="Register">
        </form>
    </section>
`;

export const registerView = (ctx) => {

    const registerHandler = async (e) => {
        e.preventDefault();
        const { ...data } = Object.fromEntries(new FormData(e.currentTarget));

        if (!data.password || !data.email) {
            return alert('Please fill all fields');
        } else if (data.password !== data.repeatPassword) {
            return alert('Password do not match');
        }

        const registerData = {
            email: data.email,
            password: data.password,
        }

        await register(registerData);
        ctx.page.redirect('/');
    }

    ctx.render(registerTemplate(registerHandler));
}

