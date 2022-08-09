function solve() {
  let addbutton = document.querySelector('#add-new div#container > button');
  addbutton.addEventListener('click', (e) => {
    e.preventDefault();
    let [name, hall, price] = document.querySelectorAll('#container input');

    if (name.value && hall.value && price.value && !isNaN(price.value)) {
      let movieListElement = document.querySelector('#movies > ul');

      movieListElement.innerHTML += `
        <li>
            <span>${name.value}</span>
            <strong>Hall: ${hall.value}</strong>
            <div>
                <strong>${Number(price.value).toFixed(2)}</strong>
                <input placeholder="Tickets Sold">
                <button>Archive</button>
            </div>
        </li>`;

      name.value = '';
      hall.value = '';
      price.value = '';
    }

    let archiveButtons = document.querySelectorAll('#movies ul li div button');
    Array.from(archiveButtons).forEach((button) =>
      button.addEventListener('click', (e) => {
        let archive = document.querySelector('#archive ul');
        let ticketPrice = e.target.parentNode.children[0];
        let ticketsSold = e.target.parentNode.children[1];

        if (Number(ticketsSold.value) || ticketsSold.value === '0') {
          archive.innerHTML += `<li>
                        <span>${
                          e.target.parentNode.parentNode.children[0].textContent
                        }</span>
                        <strong>Total amount: ${(
                          ticketPrice.textContent * ticketsSold.value
                        ).toFixed(2)}</strong>
                        <button>Delete</button>
                    </li>`;

          e.target.parentNode.parentNode.remove();

          let deleteButtonElements = document.querySelectorAll(
            '#archive ul li button'
          );
          Array.from(deleteButtonElements).forEach((button) =>
            button.addEventListener('click', (e) => {
              e.currentTarget.parentNode.remove();
            })
          );

          let clearbutton = document.querySelector('#archive > button');
          clearbutton.addEventListener('click', () => {
            document.querySelector('#archive ul').innerHTML = null;
          });
        }
      })
    );
  });
}
