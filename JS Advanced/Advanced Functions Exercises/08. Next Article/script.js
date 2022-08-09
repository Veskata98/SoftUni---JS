function getArticleGenerator(articles) {
  let count = 0;
  return function () {
    if (count < articles.length) {
      let divElement = document.querySelector('#content');

      let articleElement = document.createElement('article');
      articleElement.textContent = articles[count];

      divElement.appendChild(articleElement);

      count++;
    }
  };
}
