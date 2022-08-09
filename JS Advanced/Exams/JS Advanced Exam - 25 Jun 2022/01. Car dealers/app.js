window.addEventListener('load', solve);

function solve() {
    let inputFields = document.querySelectorAll('fieldset input,select');
    let submitButton = document.getElementById('publish');
    let tableBodyElement = document.getElementById('table-body');
    let carsListElement = document.getElementById('cars-list');
    let totalProfitElement = document.getElementById('profit');

    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        for (const input of inputFields) {
            if (input.value === '') {
                return;
            }
        }
        if (inputFields[4].value > inputFields[5].value) {
            return;
        }

        let tableRowElement = document.createElement('tr');
        tableRowElement.classList.add('row');

        let makeTdElement = document.createElement('td');
        makeTdElement.textContent = inputFields[0].value;

        let modelTdElement = document.createElement('td');
        modelTdElement.textContent = inputFields[1].value;

        let yearTdElement = document.createElement('td');
        yearTdElement.textContent = inputFields[2].value;

        let fuelTdElement = document.createElement('td');
        fuelTdElement.textContent = inputFields[3].value;

        let priceTdElement = document.createElement('td');
        priceTdElement.textContent = inputFields[4].value;

        let newPriceTdElement = document.createElement('td');
        newPriceTdElement.textContent = inputFields[5].value;

        let optionsTdElement = document.createElement('td');
        let editBtn = document.createElement('button');
        let sellBtn = document.createElement('button');

        editBtn.textContent = 'Edit';
        editBtn.classList.add('action-btn', 'edit');

        sellBtn.textContent = 'Sell';
        sellBtn.classList.add('action-btn', 'sell');

        optionsTdElement.appendChild(editBtn);
        optionsTdElement.appendChild(sellBtn);

        tableRowElement.appendChild(makeTdElement);
        tableRowElement.appendChild(modelTdElement);
        tableRowElement.appendChild(yearTdElement);
        tableRowElement.appendChild(fuelTdElement);
        tableRowElement.appendChild(priceTdElement);
        tableRowElement.appendChild(newPriceTdElement);
        tableRowElement.appendChild(optionsTdElement);

        tableBodyElement.appendChild(tableRowElement);

        for (const input of inputFields) {
            input.value = '';
        }

        editBtn.addEventListener('click', (e) => {
            for (let i = 0; i < inputFields.length; i++) {
                inputFields[i].value = tableRowElement.children[i].textContent;
            }
            tableRowElement.remove();
        });

        sellBtn.addEventListener('click', (e) => {
            let makeAndModel = `${makeTdElement.textContent} ${modelTdElement.textContent}`;
            let year = yearTdElement.textContent;
            let profit = Number(newPriceTdElement.textContent) - Number(priceTdElement.textContent);

            let soldCarLiElement = document.createElement('li');
            soldCarLiElement.classList.add('each-list');

            let makeAndModelSpanElement = document.createElement('span');
            makeAndModelSpanElement.textContent = makeAndModel;

            let yearSpanElement = document.createElement('span');
            yearSpanElement.textContent = year;

            let profitSpanElement = document.createElement('span');
            profitSpanElement.textContent = profit;

            soldCarLiElement.appendChild(makeAndModelSpanElement);
            soldCarLiElement.appendChild(yearSpanElement);
            soldCarLiElement.appendChild(profitSpanElement);

            carsListElement.appendChild(soldCarLiElement);

            let oldTotalProfit = Number(totalProfitElement.textContent);
            let newTotalProfit = (oldTotalProfit + profit).toFixed(2);
            totalProfitElement.textContent = newTotalProfit;

            tableRowElement.remove();
        });
    });
}
