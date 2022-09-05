import { html, render } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/userService.js';

const header = document.querySelector('header');

const navbarTemplate = (user, logoutHandler) => html`
    <nav>
        <a class="active" href="/">Home</a>
        <a href="/all">All Listings</a>
        <a href="/by-year">By Year</a>
        
        ${user
            ? html`
            <div id="profile">
                <a>Welcome ${user.username}</a>
                <a href="/my-listings">My Listings</a>
                <a href="/create">Create Listing</a>
                <a href="javascript:void(0)" @click=${logoutHandler}>Logout</a>
            </div>`
            :  html`
            <div id = "guest" >
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div >`
        }
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