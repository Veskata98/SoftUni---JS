import { html, render } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/userService.js';

const header = document.querySelector('header');

const navbarTemplate = (user, logoutHandler) => html`
    <nav>
        <a href="/">Theater</a>
        <ul>
            ${user
                ? html`
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="/create">Create Event</a></li>
                    <li><a href="javascript:void(0)" @click=${logoutHandler}>Logout</a></li>
                    `
                : html`
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>
                    `
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