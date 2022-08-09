function solution() {
    const mainElement = document.getElementById('main');
    let baseUrl = 'http://localhost:3030/jsonstore/advanced/articles/list';
    fetch(baseUrl)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((x) => {
                const accordionDiv = document.createElement('div');
                accordionDiv.classList.add('accordion');

                const headDiv = document.createElement('div');
                headDiv.classList.add('head');

                const titleEl = document.createElement('span');
                titleEl.textContent = x.title;

                const toggleBtn = document.createElement('button');
                toggleBtn.classList.add('button');
                toggleBtn.setAttribute('id', x._id);
                toggleBtn.textContent = 'More';

                headDiv.appendChild(titleEl);
                headDiv.appendChild(toggleBtn);

                const extraDiv = document.createElement('div');
                extraDiv.classList.add('extra');

                const contentEl = document.createElement('p');

                fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${x._id}`)
                    .then((res) => res.json())
                    .then((data) => (contentEl.textContent = data.content))
                    .catch((err) => console.log(err));

                extraDiv.appendChild(contentEl);

                accordionDiv.appendChild(headDiv);
                accordionDiv.appendChild(extraDiv);

                mainElement.appendChild(accordionDiv);

                toggleBtn.addEventListener('click', (e) => {
                    if (extraDiv.style.display === 'block') {
                        extraDiv.style.display = 'none';
                        e.currentTarget.textContent = 'More';
                    } else {
                        extraDiv.style.display = 'block';
                        e.currentTarget.textContent = 'Less';
                    }
                });
            });
        })
        .catch((err) => console.log(err));
}

solution();
