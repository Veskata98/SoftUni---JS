import page from "../node_modules/page/page.mjs";

import { auth } from "./middlewares/authentication.js";
import { renderMiddleware } from "./middlewares/renderMain.js";
import { renderNavbar } from "./middlewares/renderNavbar.js";

import { homeView } from "./views/homePage.js";
import { catalogView } from "./views/catalogPage.js";
import { createView } from "./views/createPage.js";
import { detailsView } from "./views/detailsPage.js";
import { editView } from "./views/editPage.js";

import { loginView } from "./views/loginPage.js";
import { registerView } from "./views/registerPage.js";

import { searchView } from "./views/searchPage.js";



//Attach middlewares
page(auth);
page(renderMiddleware);
page(renderNavbar);

//Attach routing
page('/', homeView);
page('/catalog', catalogView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);

page('/login', loginView);
page('/register', registerView);

page('/search', searchView);

page.start();