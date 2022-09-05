import { render } from '../../node_modules/lit-html/lit-html.js';

const main = document.getElementById('content');

const ctxRender = (templateResult) => render(templateResult, main);

export const renderMain = (ctx, next) => {
    ctx.render = ctxRender;
    next();
}