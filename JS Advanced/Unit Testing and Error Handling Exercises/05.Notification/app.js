function notify(message) {
    let messageElement = document.getElementById('notification');
    messageElement.textContent = message;
    messageElement.style.display = 'block';

    messageElement.addEventListener('click', (e) => {
        e.target.style.display = 'none';
    });
}
