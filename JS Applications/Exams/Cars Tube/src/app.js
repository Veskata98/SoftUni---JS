import page from "../node_modules/page/page.mjs";

import { auth } from "./middlewares/authentication.js";
import { renderMiddleware } from "./middlewares/renderMain.js";
import { renderNavbar } from "./middlewares/renderNavbar.js";

import { homeView } from "./views/homePage.js";
import { allListingsView } from "./views/allListingsPage.js";
import { createView } from "./views/createPage.js";
import { detailsView } from "./views/detailsPage.js";
import { editView } from "./views/editPage.js";
import { myCarsView } from "./views/myCarsPage.js";

import { loginView } from "./views/loginPage.js";
import { registerView } from "./views/registerPage.js";

import { searchView } from "./views/searchPage.js";

//Attach middlewares
page(auth);
page(renderMiddleware);
page(renderNavbar);

//Attach routing
page('/', homeView);
page('/all', allListingsView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/my-listings', myCarsView);

page('/login', loginView);
page('/register', registerView);

page('/by-year', searchView);

page.start();