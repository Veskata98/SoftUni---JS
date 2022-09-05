import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../services/userService.js';

const registerTemplate = (registerHandler) => html`
    <section id=" register">
        <div class="container">
            <form id="register-form" @submit=${registerHandler} method="POST">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr>
    
                <p>Username</p>
                <input type="text" placeholder="Enter Username" name="username" required>
    
                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password" required>
    
                <p>Repeat Password</p>
                <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                <hr>
    
                <input type="submit" class="registerbtn" value="Register">
            </form>
            <div class="signin">
                <p>Already have an account?
                    <a href="/login">Sign in</a>.
                </p>
            </div>
        </div>
    </section>
`;

export const registerView = (ctx) => {

    const registerHandler = async (e) => {
        e.preventDefault();
        const { ...data } = Object.fromEntries(new FormData(e.currentTarget));

        if (Object.values(data).some(x => x == '')) {
            alert('Please fill all fields');
        } else if (data.password !== data.repeatPass) {
            alert('Password do not match');
        } else {
            const registerData = {
                username: data.username,
                password: data.password,
            }

            await register(registerData);
            ctx.page.redirect('/');
        }
    }
    ctx.render(registerTemplate(registerHandler));
}

