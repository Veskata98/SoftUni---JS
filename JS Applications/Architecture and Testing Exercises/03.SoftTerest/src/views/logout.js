import { logoutUser } from '../api/users.js';

export async function logout(context) {
    await logoutUser();
    context.updateNav();
    context.goTo('/');
}
