import { showHome } from './views/home.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showDetails } from './views/details.js';
import { logout } from './views/logout.js';
import { initialize } from './router.js';

document.querySelector('#views').remove();

const links = {
    '/': showHome,
    '/catalog': showCatalog,
    '/create': showCreate,
    '/details': showDetails,
    '/login': showLogin,
    '/register': showRegister,
    '/logout': logout,
};

const router = initialize(links);

window.scrollTo(0, 0);
router.goTo('/');
