function solve() {
    const tbody = document.querySelector('table#results tbody');
    const submitBtn = document.getElementById('submit');

    const url = 'http://localhost:3030/jsonstore/collections/students';

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            Object.values(data).forEach((row) => {
                const tableRow = createTableRow(row);
                tbody.appendChild(tableRow);
            });
        })
        .catch((err) => console.log(err));

    submitBtn.addEventListener('click', submitHandler);

    function submitHandler(e) {
        e.preventDefault();

        const form = document.getElementById('form');
        const formData = new FormData(form);

        const readyData = Object.fromEntries(formData);

        if (
            readyData.firstName !== '' &&
            readyData.lastName !== '' &&
            readyData.facultyNumber !== '' &&
            !isNaN(readyData.facultyNumber) &&
            readyData.grade !== '' &&
            !isNaN(readyData.grade)
        ) {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(readyData),
            }).finally(location.reload());
            form.reset();
        }
    }

    function createTableRow(row) {
        const tr = document.createElement('tr');
        Object.values(row)
            .slice(0, -1)
            .forEach((x) => {
                const cell = tr.insertCell();
                cell.textContent = x;
            });
        return tr;
    }
}

solve();
