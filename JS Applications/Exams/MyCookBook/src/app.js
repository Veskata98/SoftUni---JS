import page from '../node_modules/page/page.mjs';

import { authMiddleware } from './middlewares/authMiddleware.js';
import { renderMiddleware } from './middlewares/renderMiddleware.js';

import { homeView } from './views/homePage.js';
import { catalogView } from './views/catalogPage.js';
import { createView } from './views/createPage.js';
import { detailsView } from './views/detailsPage.js';
import { editRecipeView } from './views/editRecipePage.js';
import { loginView } from './views/loginPage.js';
import { registerView } from './views/registerPage.js';
import { logoutView } from './views/logoutPage.js';

page(authMiddleware);
page(renderMiddleware);

page('/', homeView);
page('/catalog', catalogView);
page('/create', createView);
page('/details/:recipeId', detailsView);
page('/edit/:recipeId', editRecipeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);

page.start();
