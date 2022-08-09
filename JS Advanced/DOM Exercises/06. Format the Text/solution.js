function solve() {
  let output = document.getElementById('output');
  let data = document.getElementById('input').value;

  let sentencesCount = data.split('.');

  sentencesCount = sentencesCount.filter((x) => x.length > 0);

  while (sentencesCount.length > 0) {
    let sentenceToAdd = sentencesCount.splice(0, 3);
    sentenceToAdd = sentenceToAdd.join('. ').concat('.');

    let addParagraphElement = document.createElement('p');
    addParagraphElement.textContent = sentenceToAdd;

    output.appendChild(addParagraphElement);
  }
}
