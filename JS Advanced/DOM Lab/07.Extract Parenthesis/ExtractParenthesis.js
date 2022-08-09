function extract(content) {
  let textEl = document.getElementById(content).textContent;
  let words = textEl.match(/\([\w\s]+\)/g);
  return words.join('; ');
}
