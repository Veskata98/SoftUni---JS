import page from '../node_modules/page/page.mjs';

import { showHome } from './views/home.js';
import { showDetails } from './views/details.js';
import { showLogin } from './views/login.js';
import { logout } from './views/logout.js';
import { showRegister } from './views/register.js';
import { showMyFurniture } from './views/my-furniture.js';
import { showCreate } from './views/create.js';
import { editFurniture } from './views/edit.js';
import { deleteFurniture } from './views/delete.js';

page('/', showHome);
page('/details/:id', showDetails);
page('/edit/:id', editFurniture);
page('/delete/:id', deleteFurniture);
page('/login', showLogin);
page('/logout', logout);
page('/register', showRegister);
page('/my-furniture', showMyFurniture);
page('/create', showCreate);

page.start();
