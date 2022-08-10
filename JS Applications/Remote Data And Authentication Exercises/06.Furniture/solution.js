function solve() {
    const tbody = document.querySelector('tbody');
    const email = localStorage.getItem('email');

    //if user is logged (have data in localStorage) add listener to logout button
    if (email) {
        document.getElementById('logoutBtn').addEventListener('click', () => {
            localStorage.clear();
            location.href = 'home.html';
        });
    }

    // fetch all data in and render in table
    fetch('http://localhost:3030/data/furniture')
        .then((res) => res.json())
        .then((data) =>
            data.forEach((responseData) => {
                const tr = createElement('tr', '', tbody);
                const tdImg = createElement('td', '', tr);
                const img = createElement('img', '', tdImg);
                img.setAttribute('src', responseData.img);
                const tdName = createElement('td', '', tr);
                const pName = createElement('p', responseData.name, tdName);
                const tdPrice = createElement('td', '', tr);
                const pPrice = createElement('p', responseData.price, tdPrice);
                const tdFactor = createElement('td', '', tr);
                const pFactor = createElement('p', responseData.factor, tdFactor);
                const tdCheck = createElement('td', '', tr);
                const checkbox = createElement('input', '', tdCheck);
                checkbox.setAttribute('type', 'checkbox');
                if (!email) {
                    checkbox.setAttribute('disabled', '');
                }
            })
        );
}
solve();

function createElement(type, content, parentNode) {
    const element = document.createElement(type);

    if (content) {
        element.textContent = content;
    }

    parentNode.appendChild(element);

    return element;
}
