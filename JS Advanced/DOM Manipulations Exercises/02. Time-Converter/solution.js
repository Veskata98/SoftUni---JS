function attachEventsListeners() {
    let convertButtons = document.querySelectorAll('input[value="Convert"]');
    Array.from(convertButtons).forEach((button) =>
        button.addEventListener('click', (e) => {
            let type = e.target.parentNode.querySelector('input:first-of-type').id;
            let value = e.target.parentNode.querySelector('input:first-of-type').value;
            switch (type) {
                case 'days':
                    document.getElementById('hours').value = value * 24;
                    document.getElementById('minutes').value = value * 24 * 60;
                    document.getElementById('seconds').value = value * 24 * 60 * 60;
                    break;
                case 'hours':
                    document.getElementById('days').value = value / 24;
                    document.getElementById('minutes').value = value * 60;
                    document.getElementById('seconds').value = value * 60 * 60;
                    break;
                case 'minutes':
                    document.getElementById('days').value = value / 24 / 60;
                    document.getElementById('hours').value = value / 60;
                    document.getElementById('seconds').value = value * 60;
                    break;
                case 'seconds':
                    document.getElementById('days').value = value / 24 / 60 / 60;
                    document.getElementById('hours').value = value / 60 / 60;
                    document.getElementById('minutes').value = value / 60;
                    break;

                default:
                    break;
            }
        })
    );
}
