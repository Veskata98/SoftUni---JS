import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { navigationView } from '../views/navigationPage.js';

const root = document.getElementById('root');
const main = (ctx, templateResult) => html`
    <header>${navigationView(ctx)}</header>
    <main>${templateResult}</main>
`;
const ctxRender = (ctx, templateResult) => {
    render(main(ctx, templateResult), root);

    const nav = document.querySelector('nav');

    nav.querySelector('.active')?.classList.remove('active');
    nav.querySelector(`a[href="${ctx.pathname}"]`)?.classList.add('active');

};

export const renderMiddleware = (ctx, next) => {
    ctx.render = ctxRender.bind(null, ctx);
    next();
};
