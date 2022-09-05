const errorBox = document.querySelector('#errorBox')

export const notification = (text) => {
    errorBox.style.display = 'block';
    document.querySelector('#errorBox > span').textContent = text;

    setTimeout(function () {
        errorBox.style.display = 'none';
    }, 3000);
}

