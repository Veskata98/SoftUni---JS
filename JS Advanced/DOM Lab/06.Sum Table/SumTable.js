function sumTable() {
  let costElements = document.querySelectorAll('td:nth-of-type(2)');
  let sum = 0;
  Array.from(costElements).forEach((x) => {
    if (x !== undefined) {
      sum += +x.textContent;
    }
  });
  document.getElementById('sum').textContent = sum;
}
