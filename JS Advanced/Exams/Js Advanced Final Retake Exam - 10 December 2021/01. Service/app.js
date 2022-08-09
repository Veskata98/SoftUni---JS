window.addEventListener('load', solve);

function solve() {
    const productTypeEl = document.getElementById('type-product');
    const descriptionEl = document.getElementById('description');
    const nameEl = document.getElementById('client-name');
    const phoneEl = document.getElementById('client-phone');
    const receivedOrders = document.getElementById('received-orders');
    const completedOrders = document.getElementById('completed-orders');
    const clearBtn = document.querySelector('.clear-btn');
    const submitBtn = document.querySelector('div#right form button');

    submitBtn.addEventListener('click', submitHandler);

    clearBtn.addEventListener('click', clearhandler);

    function submitHandler(e) {
        e.preventDefault();
        if (descriptionEl.value !== '' && nameEl.value !== '' && phoneEl.value !== '') {
            let product = productTypeEl.value;
            let name = nameEl.value;
            let phone = phoneEl.value;
            let description = descriptionEl.value;

            descriptionEl.value = '';
            nameEl.value = '';
            phoneEl.value = '';

            const divEl = document.createElement('div');
            divEl.classList.add('container');

            const producth2 = document.createElement('h2');
            producth2.textContent = `Product type for repair: ${product}`;
            const clientInfo = document.createElement('h3');
            clientInfo.textContent = `Client information: ${name}, ${phone}`;
            const descriptionOrderEl = document.createElement('h4');
            descriptionOrderEl.textContent = `Description of the problem: ${description}`;

            const startRepairtBtn = document.createElement('button');
            startRepairtBtn.classList.add('start-btn');
            startRepairtBtn.textContent = 'Start repair';

            const finishRepairtBtn = document.createElement('button');
            finishRepairtBtn.classList.add('finish-btn');
            finishRepairtBtn.disabled = true;
            finishRepairtBtn.textContent = 'Finish Repair';

            divEl.appendChild(producth2);
            divEl.appendChild(clientInfo);
            divEl.appendChild(descriptionOrderEl);
            divEl.appendChild(startRepairtBtn);
            divEl.appendChild(finishRepairtBtn);

            receivedOrders.appendChild(divEl);

            startRepairtBtn.addEventListener('click', () => {
                startRepairtBtn.disabled = true;
                finishRepairtBtn.disabled = false;
            });

            finishRepairtBtn.addEventListener('click', () => {
                Array.from(divEl.querySelectorAll('button')).forEach((button) => button.remove());
                completedOrders.appendChild(divEl);
            });
        }
    }
    function clearhandler() {
        Array.from(document.querySelectorAll('#completed-orders .container')).forEach((el) => el.remove());
    }
}
