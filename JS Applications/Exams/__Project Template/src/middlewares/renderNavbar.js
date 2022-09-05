import { html, render } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/userService.js';

const header = document.querySelector('header');

const navbarTemplate = (user, logoutHandler) => html`
        ${user
            ? html`
                <!-- USER NAVIGATION -->
            `
            : html`
                <!-- GUEST NAVIGATION -->
            `
        }

        
`;


export const renderNavbar = (ctx, next) => {
    const logoutHandler = async () => {
        await userService.logout();
        ctx.page.redirect('/');
    }

    render(navbarTemplate(ctx.user, logoutHandler), header);
    next();
}