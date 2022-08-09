function loadRepos() {
    const url = 'https://api.github.com/users';

    const username = document.getElementById('username').value;
    const list = document.getElementById('repos');

    list.innerHTML = '';

    fetch(`${url}/${username}/repos`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('User Not Found!');
            }
        })
        .then((data) => {
            Object.values(data).forEach((x) => {
                const liElement = document.createElement('li');

                const anchorElement = document.createElement('a');
                anchorElement.setAttribute('href', x.html_url);
                anchorElement.textContent = x.full_name;

                liElement.appendChild(anchorElement);

                list.appendChild(liElement);
            });
        })
        .catch((err) => (list.textContent = err.message));
}
