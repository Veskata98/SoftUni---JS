const section = document.getElementById('home');

let ctx = null;

export function showHome(context) {
    ctx = context;
    context.updateNav();
    context.showSection(section);
}

section.addEventListener('click', (e) => {
    if (e.target.tagName == 'A') {
        e.preventDefault();
        ctx.goTo('/catalog');
    }
});
