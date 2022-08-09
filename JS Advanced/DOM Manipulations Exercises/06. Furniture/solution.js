function solve() {
  let generateButton = document.querySelector('#exercise button:first-of-type');
  let buyButton = document.querySelector('#exercise button:last-of-type');

  let chairCheckboxActivate = document.querySelector('tbody tr td input');
  chairCheckboxActivate.removeAttribute('disabled');

  generateButton.addEventListener('click', () => {
    let generateInput = document.querySelector(
      '#exercise textarea:first-of-type'
    );
    let tableBody = document.querySelector('tbody');

    generateInput = JSON.parse(generateInput.value);

    for (const item of generateInput) {
      let rowElement = tableBody.insertRow();

      let tdElementImg = document.createElement('td');
      let imgElement = document.createElement('img');
      imgElement.src = item.img;

      let tdElementName = document.createElement('td');
      let elementName = document.createElement('p');
      elementName.textContent = item.name;

      let tdElementPrice = document.createElement('td');
      let elementPrice = document.createElement('p');
      elementPrice.textContent = item.price;

      let tdElementDefactor = document.createElement('td');
      let elementDefacton = document.createElement('p');
      elementDefacton.textContent = item.decFactor;

      let tdElementCheckbox = document.createElement('td');
      let elementCheckbox = document.createElement('input');
      elementCheckbox.type = 'checkbox';

      tdElementImg.appendChild(imgElement);
      rowElement.appendChild(tdElementImg);

      tdElementName.appendChild(elementName);
      rowElement.appendChild(tdElementName);

      tdElementPrice.appendChild(elementPrice);
      rowElement.appendChild(tdElementPrice);

      tdElementDefactor.appendChild(elementDefacton);
      rowElement.appendChild(tdElementDefactor);

      tdElementCheckbox.appendChild(elementCheckbox);
      rowElement.appendChild(tdElementCheckbox);
    }
  });

  let boughtItems = {
    items: [],
    sum: 0,
    decFactor: 0,
  };

  buyButton.addEventListener('click', () => {
    let tableItems = document.querySelectorAll('tbody tr');
    let boughtText = document.querySelector('#exercise textarea:last-of-type');
    Array.from(tableItems)
      .filter((x) => x.lastElementChild.firstElementChild.checked === true)
      .forEach((x) => {
        boughtItems.items.push(x.children[1].innerText);
        boughtItems.sum += Number(x.children[2].innerText);
        boughtItems.decFactor += Number(x.children[3].innerText);
      });
    boughtText.value = `Bought furniture: ${boughtItems.items.join(
      ', '
    )}\nTotal price: ${boughtItems.sum.toFixed(
      2
    )}\nAverage decoration factor: ${
      boughtItems.decFactor / boughtItems.items.length
    }`;
  });
}
