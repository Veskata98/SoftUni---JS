import page from '../../node_modules/page/page.mjs';

import { logoutUser } from '../api/users.js';

export const logout = async () => {
    await logoutUser();
    page.redirect('/');
};
