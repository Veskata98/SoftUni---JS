function getInfo() {
    let stopId = document.getElementById('stopId');
    let stopName = document.getElementById('stopName');
    let stopList = document.getElementById('buses');

    while (stopList.firstChild) {
        stopList.firstChild.remove();
    }

    let baseUrl = 'http://localhost:3030/jsonstore/bus/businfo';

    if (stopId.value) {
        // try {
        //     let res = await fetch(`${baseUrl}/${stopId.value}`);
        //     if (res.status !== 200) {
        //         throw new Error('Invalid stop ID!');
        //     }
        //     let data = await res.json();

        //     stopName.textContent = data.name;

        //     Object.entries(data.buses).forEach((x) => {
        //         let liElement = document.createElement('li');
        //         liElement.textContent = `Bus ${x[0]} arrives in ${x[1]} minutes`;
        //         stopList.appendChild(liElement);
        //     });
        // } catch (error) {
        //     console.log(error);
        // }

        fetch(`${baseUrl}/${stopId.value}`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Invalid bus stop id!');
                }
            })
            .then((data) => {
                stopName.textContent = data.name;
                Object.entries(data.buses).forEach((x) => {
                    let liElement = document.createElement('li');
                    liElement.textContent = `Bus ${x[0]} arrives in ${x[1]} minutes`;
                    stopList.appendChild(liElement);
                });
            })
            .catch((err) => (stopName.textContent = 'Error'));
    } else {
        stopName.textContent = '';
    }
    stopId.value = '';
}
