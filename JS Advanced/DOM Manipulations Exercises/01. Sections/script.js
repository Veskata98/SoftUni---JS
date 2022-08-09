function create(words) {
    words.forEach((element) => {
        let div = document.createElement('div');
        let parag = document.createElement('p');
        parag.textContent = element;
        parag.style.display = 'none';
        div.appendChild(parag);
        document.getElementById('content').appendChild(div);
        div.addEventListener('click', (e) => {
            e.target.querySelector('p').style.display = 'block';
        });
    });
}
