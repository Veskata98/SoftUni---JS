import { render } from '../../node_modules/lit-html/lit-html.js';

const main = document.getElementById('main-content');

const ctxRender = (templateResult) => render(templateResult, main);

export const renderMiddleware = (ctx, next) => {
    ctx.render = ctxRender;
    next();
}