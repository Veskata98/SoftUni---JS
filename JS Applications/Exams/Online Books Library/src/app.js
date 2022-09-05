import page from "../node_modules/page/page.mjs";

import { auth } from "./middlewares/authentication.js";
import { renderMiddleware } from "./middlewares/renderMain.js";
import { renderNavbar } from "./middlewares/renderNavbar.js";

import { dashboardView } from "./views/dashboardPage.js";
import { detailsView } from "./views/detailsPage.js";
import { addView } from "./views/addPage.js";
import { editView } from "./views/editPage.js";
import { myBooksView } from "./views/myBooksPage.js";

import { loginView } from "./views/loginPage.js";
import { registerView } from "./views/registerPage.js";


//Attach middlewares
page(auth);
page(renderMiddleware);
page(renderNavbar);

//Attach routing
page('/', dashboardView);
page('/add', addView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/my-books', myBooksView);

page('/login', loginView);
page('/register', registerView);

page.start();