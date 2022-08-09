function attachEvents() {
    const submit = document.getElementById('submit');
    const refresh = document.getElementById('refresh');
    const textArea = document.getElementById('messages');

    const url = 'http://localhost:3030/jsonstore/messenger';

    refresh.addEventListener('click', async () => {
        textArea.innerHTML = '';
        const res = await fetch(url);
        const data = await res.json();

        textArea.value = Object.values(data)
            .map((x) => `${x.author}: ${x.content}`)
            .join('\n');
    });

    submit.addEventListener('click', async () => {
        const name = document.querySelector('#controls input:first-of-type');
        const message = document.querySelector('#controls input:nth-of-type(2');

        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ author: name.value, content: message.value }),
        });

        refresh.click();
    });
}

attachEvents();
