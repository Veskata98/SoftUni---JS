import page from "../node_modules/page/page.mjs";

import { auth } from "./middlewares/authentication.js";
import { renderMain } from "./middlewares/renderMain.js";
import { renderNavbar } from "./middlewares/renderNavbar.js";

import { homeView } from "./views/homePage.js";
import { profileView } from "./views/profilePge.js";
import { createView } from "./views/createPage.js";
import { detaildsView } from "./views/detailsPage.js";
import { editView } from "./views/editPage.js";

import { loginView } from "./views/loginPage.js";
import { registerView } from "./views/registerPage.js";




//Attach middlewares
page(auth);
page(renderMain);
page(renderNavbar);

//Attach routing
page('/', homeView);
page('/profile', profileView);
page('/create', createView);
page('/details/:id', detaildsView);
page('/edit/:id', editView);

page('/login', loginView);
page('/register', registerView);

page.start();