import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../services/userService.js';

//@submit=${loginHandler} method="POST"

const loginTemplate = (loginHandler) => html`

`;


export const loginView = (ctx) => {

    const loginHandler = async (e) => {
        e.preventDefault();
        const { ...data } = Object.fromEntries(new FormData(e.currentTarget));

        if (!Object.values(data).some(x => x == '')) {
            await login(data);
            ctx.page.redirect('/');
        } else {
            alert('Please fill all fields')
        }
    }

    ctx.render(loginTemplate(loginHandler));
}

