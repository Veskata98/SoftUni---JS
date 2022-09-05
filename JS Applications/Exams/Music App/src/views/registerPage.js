import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../services/userService.js';

const registerTemplate = (registerHandler) => html`
    <section id="registerPage">
        <form @submit=${registerHandler} method="POST">
            <fieldset>
                <legend>Register</legend>
    
                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">
    
                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">
    
                <label for="conf-pass" class="vhide">Confirm Password:</label>
                <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">
    
                <button type="submit" class="register">Register</button>
    
                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>
`;

export const registerView = (ctx) => {

    const registerHandler = async (e) => {
        e.preventDefault();
        const { ...data } = Object.fromEntries(new FormData(e.currentTarget));

        if (Object.values(data).some(x => x == '')) {
            alert('Please fill all fields');
        } else if (data.password !== data['conf-pass']) {
            alert('Password do not match');
        } else {
            const registerData = {
                email: data.email,
                password: data.password,
            }

            await register(registerData);
            ctx.page.redirect('/');
        }
    }
    ctx.render(registerTemplate(registerHandler));
}

