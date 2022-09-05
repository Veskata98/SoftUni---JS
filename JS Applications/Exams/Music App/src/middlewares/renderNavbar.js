import { html, render } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/userService.js';

const header = document.querySelector('header');

const navbarTemplate = (user, logoutHandler) => html`
    <nav>
        <img src="/images/headphones.png">
        <a href="/">Home</a>
        <ul>
            <li><a href="/catalog">Catalog</a></li>
            <li><a href="/search">Search</a></li>

            ${user
                ? html`
                    <li><a href="/create">Create Album</a></li>
                    <li><a href="javascript:void(0)" @click=${logoutHandler}>Logout</a></li>`
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