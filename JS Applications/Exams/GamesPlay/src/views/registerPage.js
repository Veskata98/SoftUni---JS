import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../services/userService.js';



const registerTemplate = (registerHandler) => html`
    <section id="register-page" class="content auth">
        <form id="register" @submit=${registerHandler} method="POST">
            <div class="container">
                <div class="brand-logo"></div>
                <h1>Register</h1>
    
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="maria@email.com">
    
                <label for="pass">Password:</label>
                <input type="password" name="password" id="register-password">
    
                <label for="con-pass">Confirm Password:</label>
                <input type="password" name="confirm-password" id="confirm-password">
    
                <input class="btn submit" type="submit" value="Register">
    
                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </div>
        </form>
    </section>
`;

export const registerView = (ctx) => {

    const registerHandler = async (e) => {
        e.preventDefault();
        const { ...data } = Object.fromEntries(new FormData(e.currentTarget));

        if (Object.values(data).some(x => x == '')) {
            alert('Please fill all fields');
        } else if (data.password !== data['confirm-password']) {
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

