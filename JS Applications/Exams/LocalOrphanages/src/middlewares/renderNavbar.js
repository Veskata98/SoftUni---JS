import { html, render } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/userService.js';

const header = document.querySelector('header');

const logoutHandler = async (ctx) => {
    await userService.logout();
    ctx.page.redirect('/');
}

const navbarTemplate = (ctx) => html`
    <h1><a href="/">Orphelp</a></h1>
    
    <nav>
        <a href="/">Dashboard</a>
        
        ${ctx.user
            ? html` 
            <div id="user">
                <a href="/my-posts">My Posts</a>
                <a href="/create">Create Post</a>
                <a href="javascript:void(0)" @click=${() => logoutHandler(ctx)}>Logout</a>
            </div>`
            : html` 
            <div id="guest">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>` 
        }  
    </nav>
`;

export const renderNavbar = (ctx, next) => {
    render(navbarTemplate(ctx), header);
    next();
}