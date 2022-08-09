function addItem() {
  let itemsElement = document.getElementById('items');
  let text = document.getElementById('newItemText');
  if (text.value.length > 0) {
    let newLiElement = document.createElement('li');
    newLiElement.textContent = text.value;

    itemsElement.appendChild(newLiElement);
  }
}
