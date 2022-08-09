async function loadCommits() {
    const url = 'https://api.github.com/repos';

    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const list = document.getElementById('commits');

    try {
        const res = await fetch(`${url}/${username}/${repo}/commits`);
        if (!res.ok) {
            throw new Error(res.status);
        }
        const data = await res.json();

        data.forEach((x) => {
            const li = document.createElement('li');
            li.textContent = `${x.commit.author.name}: ${x.commit.message}`;
            list.appendChild(li);
        });
    } catch (err) {
        list.textContent = err + ' (Not found)';
    }
}
