import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../services/userService.js';

//@submit=${registerHandler} method="POST"

const registerTemplate = (registerHandler) => html`

`;

export const registerView = (ctx) => {

    const registerHandler = async (e) => {
        e.preventDefault();
        const { ...data } = Object.fromEntries(new FormData(e.currentTarget));

        if (Object.values(data).some(x => x == '')) {
            alert('Please fill all fields');
        } else if (data.password !== data.rePass) {
            alert('Password do not match');
        } else {
            const registerData = {
                email: data.email,
                password: data.password,
            }

            await register(registerData);
            ctx.page.redirect('/');
        }
    }
    ctx.render(registerTemplate(registerHandler));
}

