const allSections = [...document.querySelectorAll('section')];

export function setActiveClass(element) {
    let activeElement = document.querySelector('.active');
    if (activeElement) {
        activeElement.classList.remove('active');
    }
    if (element.parentNode.tagName != 'H1') {
        element.classList.add('active');
    }
}

export function removeActiveClass() {
    document.querySelector('.active').classList.remove('active');
}

export function removeHiddenClass(element) {
    element.classList.remove('hidden');
}

export function hideAllSections() {
    allSections.forEach((el) => el.classList.remove('visible-block', 'visible-inline'));
    allSections.forEach((el) => el.classList.add('hidden'));
}

export function loadingScreen(element) {
    element.innerHTML = '<h1 style="color: white">Loading...</h1>';
}

export function getUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
}

export const getFormData = (form, [...fields]) => {
    const formData = new FormData(form);
    return [...fields.map((x) => formData.get(x))];
};
