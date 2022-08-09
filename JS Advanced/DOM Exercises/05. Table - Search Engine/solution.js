function solve() {
  document.querySelector('#searchBtn').addEventListener('click', onClick);

  function onClick() {
    let tableRows = document.querySelectorAll('tbody tr');

    for (const row of tableRows) {
      row.removeAttribute('class');
    }

    let searchedValue = document.getElementById('searchField');

    if (searchedValue.value.length > 0) {
      for (let i = 0; i < tableRows.length; i++) {
        Array.from(tableRows[i].children).forEach((x) => {
          if (x.textContent.includes(searchedValue.value)) {
            tableRows[i].setAttribute('class', 'select');
          }
        });
      }
    }
    searchedValue.value = '';
  }
}
