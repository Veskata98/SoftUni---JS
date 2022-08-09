function extractText() {
  let listElements = document.getElementsByTagName("li");
  let result = [];
  for (const list of listElements) {
    result.push(list.textContent);
  }
  let textAreaElement = document.getElementById("result");
  textAreaElement.innerHTML = result.join("\n");
}
