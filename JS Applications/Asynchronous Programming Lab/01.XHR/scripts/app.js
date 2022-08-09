function loadRepos() {
    const res = new XMLHttpRequest();
    res.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('res').textContent = res.responseText;
        }
    };
    res.open('GET', 'https://api.github.com/users/testnakov/repos');
    res.send();
}
