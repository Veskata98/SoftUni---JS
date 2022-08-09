function solve() {
  let tableElements = document.querySelectorAll('tbody tr td');
  let buttonCheckElement = document.querySelector('tfoot tr td :first-child');
  let resetElement = document.querySelector('tfoot tr td :last-child');

  let resultElement = document.querySelector('#check p');

  buttonCheckElement.addEventListener('click', () => {
    let matrix = [];
    for (let i = 0; i < tableElements.length / 3; i++) {
      matrix[i] = new Array(tableElements.length / 3);
    }

    let allLines = [];

    let count = 0;

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        matrix[i][j] = Number(tableElements[count].children[0].value);
        count++;
      }
    }

    for (let i = 0; i < matrix.length; i++) {
      let row = [];
      let column = [];

      for (let j = 0; j < matrix.length; j++) {
        row.push(matrix[i][j]);
        column.push(matrix[j][i]);
      }

      row = row.reduce((acc, x) => acc + Number(x), 0);
      column = column.reduce((acc, x) => acc + Number(x), 0);
      allLines.push(row, column);
    }

    let allEqual = allLines.every((x) => x === allLines[0] && x);
    if (allEqual) {
      resultElement.style.color = 'green';
      document.querySelector('table').style.border = '2px solid green';
      resultElement.textContent = 'You solve it! Congratulations!';
    } else {
      resultElement.style.color = 'red';
      document.querySelector('table').style.border = '2px solid red';
      resultElement.textContent = 'NOP! You are not done yet...';
    }
  });
  resetElement.addEventListener('click', () => {
    document.querySelector('table').removeAttribute('style');
    resultElement.textContent = null;
  });
}
