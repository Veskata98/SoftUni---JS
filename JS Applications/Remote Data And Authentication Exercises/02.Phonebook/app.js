function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/phonebook';

    const ul = document.getElementById('phonebook');
    const loadBtn = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');

    loadBtn.addEventListener('click', async () => {
        ul.innerHTML = '';
        const res = await fetch(url);
        const data = await res.json();

        Object.values(data).forEach((x) => {
            const li = document.createElement('li');
            li.textContent = `${x.person}: ${x.phone}`;

            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';

            li.appendChild(delBtn);
            ul.appendChild(li);

            delBtn.addEventListener('click', async () => {
                const delResponse = await fetch(`${url}/${x._id}`, {
                    method: 'DELETE',
                });
                loadBtn.click();
            });
        });
    });
    createBtn.addEventListener('click', async () => {
        const person = document.getElementById('person').value;
        const phone = document.getElementById('phone').value;

        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ person, phone }),
        });

        loadBtn.click();
    });
}

attachEvents();
