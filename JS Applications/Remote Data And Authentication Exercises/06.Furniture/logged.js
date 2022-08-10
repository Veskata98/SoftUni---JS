function logged() {
    const createUrl = 'http://localhost:3030/data/furniture';
    const userToken = localStorage.getItem('accessToken');

    //create button event listener
    document.getElementById('createForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(createForm);

        const name = formData.get('name');
        const price = formData.get('price');
        const factor = formData.get('factor');
        const img = formData.get('img');

        if (name !== '' && price !== '' && factor !== '' && img !== '') {
            try {
                const createRes = await fetch(createUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Authorization': userToken,
                    },
                    body: JSON.stringify({ name, price, factor, img }),
                });

                if (!createRes.ok) {
                    throw new Error(createRes.status + ' ' + createRes.statusText);
                }

                const responseData = await createRes.json();

                console.log(responseData);

                location.href = 'homeLogged.html';
            } catch (err) {
                alert(err);
            }
        }
    });

    //buy button event listener
    document.querySelector('div.col-md-12 > button').addEventListener('click', () => {
        let boughtItems = [];
        let totalSum = 0;
        Array.from(document.querySelectorAll('tbody tr')).forEach((row) => {
            if (row.lastElementChild.children[0].checked) {
                boughtItems.push(row.children[1].children[0].textContent);
                totalSum += Number(row.children[2].children[0].textContent);
            }
        });
        if (boughtItems.length) {
            fetch('http://localhost:3030/data/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': userToken,
                },
                body: JSON.stringify({ boughtItems, totalSum }),
            });
        }
    });

    //all orders button event listener
    document.querySelector('div.orders > button').addEventListener('click', () => {
        const userId = localStorage.getItem('_id');
        console.log(userId);
        fetch(`http://localhost:3030/data/orders?where=_ownerId%3D${userId}`)
            .then((res) => res.json())
            .then((data) => console.log(data));
    });
}

logged();
