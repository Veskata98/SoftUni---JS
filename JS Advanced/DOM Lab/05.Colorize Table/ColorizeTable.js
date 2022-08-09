function colorize() {
  let rowElements = document.getElementsByTagName('tr');
  Array.from(rowElements).forEach((x, i) => {
    if (i % 2 === 1) {
      x.style.backgroundColor = 'teal';
    }
  });
}
