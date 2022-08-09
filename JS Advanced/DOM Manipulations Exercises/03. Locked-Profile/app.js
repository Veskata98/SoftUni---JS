function lockedProfile() {
    let showMoreButtons = document.querySelectorAll('.profile button');
    Array.from(showMoreButtons).forEach((button) =>
        button.addEventListener('click', (e) => {
            if (!e.target.parentElement.querySelector('input[type="radio"]').checked) {
                let showElement = e.target.parentElement.querySelector('div:last-of-type');
                if (showElement.style.display === 'block') {
                    e.target.textContent = 'Show more';
                    showElement.style.display = 'none';
                } else {
                    e.target.textContent = 'Hide it';
                    showElement.style.display = 'block';
                }
            }
        })
    );
}
