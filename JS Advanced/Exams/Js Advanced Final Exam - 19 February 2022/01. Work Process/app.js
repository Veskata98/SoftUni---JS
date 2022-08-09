function solve() {
    const inputFields = document.querySelectorAll('div input');
    const tableBodyElement = document.getElementById('tbody');
    const sumElement = document.getElementById('sum');

    document.getElementById('add-worker').addEventListener('click', (e) => {
        e.preventDefault();
        if (Array.from(inputFields).every((input) => input.value !== '')) {
            addWorker();
        }
    });

    function addWorker() {
        const tableRowElement = document.createElement('tr');

        const oldSumValue = Number(sumElement.textContent);
        const newSalary = Number(inputFields[5].value);
        sumElement.textContent = (oldSumValue + newSalary).toFixed(2);

        Array.from(inputFields).forEach((element) => {
            const tdElement = document.createElement('td');
            tdElement.textContent = element.value;
            tableRowElement.appendChild(tdElement);
            element.value = '';
        });

        const actionsElement = document.createElement('td');

        const firedBtn = document.createElement('button');
        firedBtn.classList.add('fired');
        firedBtn.textContent = 'Fired';

        const editBtn = document.createElement('button');
        editBtn.classList.add('edit');
        editBtn.textContent = 'Edit';

        actionsElement.appendChild(firedBtn);
        actionsElement.appendChild(editBtn);

        tableRowElement.appendChild(actionsElement);

        tableBodyElement.appendChild(tableRowElement);

        editBtn.addEventListener('click', editBtnHandler);
        firedBtn.addEventListener('click', firedBtnHandler);
    }

    function editBtnHandler(e) {
        const currentRow = e.target.parentNode.parentNode;
        Array.from(inputFields).forEach((field, index) => (field.value = currentRow.children[index].textContent));

        const sumBeforeEdit = Number(sumElement.textContent);
        const salaryToDeSubtracted = Number(currentRow.children[5].textContent);
        sumElement.textContent = (sumBeforeEdit - salaryToDeSubtracted).toFixed(2);

        currentRow.remove();
    }

    function firedBtnHandler(e) {
        const currentRow = e.target.parentNode.parentNode;

        const sumBeforeFired = Number(sumElement.textContent);
        const salaryToDeSubtracted = Number(currentRow.children[5].textContent);
        sumElement.textContent = (sumBeforeFired - salaryToDeSubtracted).toFixed(2);

        currentRow.remove();
    }
}

solve();
