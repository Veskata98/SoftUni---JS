function solve() {
    let stop = { next: 'depot' };
    const title = document.querySelector('#info > span');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    function depart() {
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${stop.next}`)
            .then((res) => res.json())
            .then((data) => {
                stop = data;
                title.textContent = 'Next stop ' + data.name;
                arriveBtn.disabled = false;
                departBtn.disabled = true;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function arrive() {
        title.textContent = 'Arriving at ' + stop.name;
        arriveBtn.disabled = true;
        departBtn.disabled = false;
    }

    return {
        depart,
        arrive,
    };
}

let result = solve();
