import { html } from '../../node_modules/lit-html/lit-html.js';

const setActiveLink = (e) => {
    if (e.target.tagName == 'A') {
        const oldActiveElement = e.currentTarget.querySelector('.active');

        if (oldActiveElement) {
            oldActiveElement.removeAttribute('class');
        }
        e.target.classList.add('active');
    }
};

const navigationTemplate = (ctx) => html`
    <h1>
        <a href="/">
            <img src="assets/logo.png" />
            My Cookbook
        </a>
    </h1>
    <nav>
        <a id="catalogLink" href="/catalog">Catalog</a>
        <div>
            ${ctx.isAuthenticated
                ? html`
                      <a href="/create">Create Recipe</a>
                      <a id="logoutBtn" href="/logout">Logout</a>
                  `
                : html`
                      <a href="/login">Login</a>
                      <a href="/register">Register</a>
                  `}
        </div>
    </nav>
`;

export const navigationView = (ctx) => {
    return navigationTemplate(ctx);
};
