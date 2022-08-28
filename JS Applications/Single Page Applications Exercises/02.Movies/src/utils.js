const guestNav = [...document.querySelectorAll('nav a.guest')];
const userNav = [...document.querySelectorAll('nav a.user')];
const sections = [...document.querySelectorAll('section')];
const addMovieBtn = document.getElementById('addMovieBtn');

function hideAllSection() {
    sections.forEach((s) => s.classList.add('hidden'));
}

export function showSection(section) {
    hideAllSection();
    section.classList.remove('hidden');
}

export function updateNav() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        userNav.forEach((x) => (x.style.display = 'block'));
        guestNav.forEach((x) => (x.style.display = 'none'));

        userNav[0].textContent = `Welcome, ${user.email}`;
        addMovieBtn.classList.remove('hidden');
    } else {
        userNav.forEach((x) => (x.style.display = 'none'));
        guestNav.forEach((x) => (x.style.display = 'block'));

        addMovieBtn.classList.add('hidden');
    }
}

export const getFormData = (form, [...fields]) => {
    const formData = new FormData(form);
    return [...fields.map((x) => formData.get(x))];
};
