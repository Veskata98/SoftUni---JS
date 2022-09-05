import { html, render } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/userService.js';

const header = document.querySelector('#site-header');

const navbarTemplate = (user, logoutHandler) => html`
    <nav class="navbar">
        <section class="navbar-dashboard">
            <a href="/">Dashboard</a>
            ${user
                ? html`
                <div id="user">
                    <span>Welcome, ${user.email}</span>
                    <a class="button" href="/my-books">My Books</a>
                    <a class="button" href="/add">Add Book</a>
                    <a class="button" href="javascript:void(0)" @click=${logoutHandler}>Logout</a> </div>
                `
            : html`
                <div id="guest">
                    <a class="button" href="/login">Login</a>
                    <a class="button" href="/register">Register</a> </div>
                `
            }
        </section>
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