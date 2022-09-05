import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../services/userService.js';


const loginTemplate = (loginHandler) => html`
    <section id="login-page" class="auth">
        <form id="login" @submit=${loginHandler} method="POST">
            <h1 class="title">Login</h1>
    
            <article class="input-group">
                <label for="login-email">Email: </label>
                <input type="email" id="login-email" name="email">
            </article>
    
            <article class="input-group">
                <label for="password">Password: </label>
                <input type="password" id="password" name="password">
            </article>
    
            <input type="submit" class="btn submit-btn" value="Log In">
        </form>
    </section>`;


export const loginView = (ctx) => {

    const loginHandler = async (e) => {
        e.preventDefault();
        const { ...data } = Object.fromEntries(new FormData(e.currentTarget));

        if (Object.values(data).some(x => !x)) {
            alert('Please fill all fields')
        } else {
            await login(data);
            ctx.page.redirect('/');
        }
    }
    ctx.render(loginTemplate(loginHandler));
}



