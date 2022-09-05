import page from "../node_modules/page/page.mjs";

import { auth } from "./middlewares/authentication.js";
import { renderMiddleware } from "./middlewares/renderMain.js";
import { renderNavbar } from "./middlewares/renderNavbar.js";

import { homeView } from "./views/homePage.js";
import { allMemesView } from "./views/allMemesPage.js";
import { createView } from "./views/createPage.js";
import { detailsView } from "./views/detailsPage.js";
import { editView } from "./views/editPage.js";
import { myProfileView } from "./views/myProfilePage.js";

import { loginView } from "./views/loginPage.js";
import { registerView } from "./views/registerPage.js";




//Attach middlewares
page(auth);
page(renderMiddleware);
page(renderNavbar);

//Attach routing
page('/', homeView);
page('/all-memes', allMemesView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/my-profile', myProfileView);

page('/login', loginView);
page('/register', registerView);


page.start();