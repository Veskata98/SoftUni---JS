import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../services/userService.js';
import { notification } from '../utils/notificatios.js';

const registerTemplate = (registerHandler) => html`
    <section id="register">
        <form id="register-form" @submit=${registerHandler} method="POST">
            <div class="container">
                <h1>Register</h1>
                <label for="username">Username</label>
                <input id="username" type="text" placeholder="Enter Username" name="username">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="Enter Email" name="email">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <label for="repeatPass">Repeat Password</label>
                <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                <div class="gender">
                    <input type="radio" name="gender" id="female" value="female">
                    <label for="female">Female</label>
                    <input type="radio" name="gender" id="male" value="male" checked>
                    <label for="male">Male</label>
                </div>
                <input type="submit" class="registerbtn button" value="Register">
                <div class="container signin">
                    <p>Already have an account?<a href="#">Sign in</a>.</p>
                </div>
            </div>
        </form>
    </section>
`;

export const registerView = (ctx) => {

    const registerHandler = async (e) => {
        e.preventDefault();
        const { ...data } = Object.fromEntries(new FormData(e.currentTarget));

        if (Object.values(data).some(x => x == '')) {
            notification('Please fill all fields');
        } else if (data.password !== data.repeatPass) {
            notification('Password do not match');
        } else {
            const registerData = {
                username: data.username,
                email: data.email,
                password: data.password,
                gender: data.gender,
            }

            await register(registerData);
            ctx.page.redirect('/all-memes');
        }
    }
    ctx.render(registerTemplate(registerHandler));
}

