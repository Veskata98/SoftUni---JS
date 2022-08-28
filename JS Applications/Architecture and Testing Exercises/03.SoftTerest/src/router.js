export function initialize(links) {
    const main = document.querySelector('main');
    document.querySelector('nav').addEventListener('click', onNavigate);

    const context = {
        showSection,
        goTo,
        updateNav,
    };

    return context;

    function showSection(section) {
        main.replaceChildren(section);
    }

    function onNavigate(e) {
        let target = e.target;
        if (target.tagName == 'IMG') {
            target = target.parentNode;
        }
        if (target.tagName == 'A') {
            e.preventDefault();
            const url = new URL(target.href);
            goTo(url.pathname);
        }
    }

    function goTo(link, ...params) {
        const handler = links[link];
        if (typeof handler == 'function') {
            handler(context, ...params);
        }
    }

    function updateNav() {
        const user = localStorage.getItem('user');
        if (user) {
            document.querySelectorAll('.user').forEach((el) => (el.style.display = 'block'));
            document.querySelectorAll('.guest').forEach((el) => (el.style.display = 'none'));
        } else {
            document.querySelectorAll('.user').forEach((el) => (el.style.display = 'none'));
            document.querySelectorAll('.guest').forEach((el) => (el.style.display = 'block'));
        }
    }
}
