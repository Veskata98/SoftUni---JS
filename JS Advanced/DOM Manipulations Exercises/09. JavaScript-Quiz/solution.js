function solve() {
  let results = [];
  let questionNumber = 1;
  let answers = [
    'onclick',
    'JSON.stringify()',
    'A programming API for HTML and XML documents',
  ];

  let result = document.querySelector('.results-inner h1');
  let buttons = document.querySelectorAll('.answer-text');
  console.log(buttons);
  Array.from(buttons).forEach((x) => {
    x.addEventListener('click', (e) => {
      results.push(e.currentTarget.textContent);
      x.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
      let nextSection = document.querySelectorAll(`section`)[questionNumber];
      if (nextSection) {
        nextSection.style.display = 'block';
      } else {
        let printLine = '';
        let count = 0;
        for (let i = 0; i < results.length; i++) {
          if (results[i] == answers[i]) {
            count++;
          }
        }
        result.parentNode.parentNode.style.display = 'block';
        if (count === results.length) {
          printLine = 'You are recognized as top JavaScript fan!';
        } else {
          printLine = `You have ${count} right answers`;
        }
        result.textContent = printLine;
        return;
      }
      questionNumber++;
    });
  });
}
