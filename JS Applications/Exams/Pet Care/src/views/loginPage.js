import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../services/userService.js';

//@submit=${loginHandler} method="POST"

const loginTemplate = (loginHandler) => html`
    <section id="loginPage">
        <form class="loginForm" @submit=${loginHandler} method="POST">
            <img src="/images/logo.png" alt="logo" />
            <h2>Login</h2>
    
            <div>
                <label for="email">Email:</label>
                <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
            </div>
    
            <div>
                <label for="password">Password:</label>
                <input id="password" name="password" type="password" placeholder="********" value="">
            </div>
    
            <button class="btn" type="submit">Login</button>
    
            <p class="field">
                <span>If you don't have profile click <a href="#">here</a></span>
            </p>
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

