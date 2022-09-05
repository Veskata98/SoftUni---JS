import { html, render } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/userService.js';

const header = document.querySelector('header');

const navbarTemplate = (user, logoutHandler) => html`
    <nav>
        <section class="logo">
            <img src="/images/logo.png" alt="logo">
        </section>
        <ul>

            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>

            ${user
                ? html`
                <li><a href="/create">Create Postcard</a></li>
                <li><a href="javascript:void(0)" @click=${logoutHandler}>Logout</a></li>
                `
                : html`
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>`
            }

        </ul>
    </nav>
`;


export const renderNavbar = (ctx, next) => {
    const logoutHandler = async () => {
        await userService.logout();
        ctx.page.redirect('/');
    }

    render(navbarTemplate(ctx.user, logoutHandler), header);
    next();
}