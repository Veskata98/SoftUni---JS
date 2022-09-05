import page from "../node_modules/page/page.mjs";

import { auth } from "./middlewares/authentication.js";
import { renderMiddleware } from "./middlewares/renderMain.js";
import { renderNavbar } from "./middlewares/renderNavbar.js";

import { dashboardView } from "./views/dashboardPage.js";
import { createView } from "./views/createPage.js";
import { detaildsView } from "./views/detailsPage.js";
import { editView } from "./views/editPage.js";
import { myPostsView } from "./views/myPostsPage.js";
import { loginView } from "./views/loginPage.js";
import { registerView } from "./views/registerPage.js";

//Attach middlewares
page(auth);
page(renderMiddleware);
page(renderNavbar);

//Attach routing
page('/', dashboardView);
page('/create', createView);
page('/details/:postId', detaildsView);
page('/details/:postId/edit', editView);
page('/my-posts', myPostsView);
page('/login', loginView);
page('/register', registerView);

page.start();