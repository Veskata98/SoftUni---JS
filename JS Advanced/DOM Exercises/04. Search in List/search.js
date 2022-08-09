function search() {
  let towns = document.querySelectorAll('#towns li');
  let searchedValue = document.getElementById('searchText');
  let result = document.getElementById('result');

  for (const town of towns) {
    town.removeAttribute(
      'style',
      'text-decoration: underline; font-weight: bold;'
    );
  }

  let count = 0;

  Array.from(towns).forEach((x) => {
    if (x.textContent.includes(searchedValue.value)) {
      x.setAttribute('style', 'text-decoration: underline; font-weight: bold;');
      count++;
    }
  });
  result.textContent = `${count} matches found`;
}
