function addItem() {
  let itemsElement = document.getElementById('items');
  let text = document.getElementById('newItemText');
  if (text.value.length > 0) {
    let newLiElement = document.createElement('li');
    newLiElement.textContent = text.value;

    let deleteElement = document.createElement('a');
    deleteElement.href = '#';
    deleteElement.textContent = '[Delete]';

    newLiElement.appendChild(deleteElement);

    itemsElement.appendChild(newLiElement);

    deleteElement.addEventListener('click', (e) => {
      console.log(e.currentTarget.parentNode.remove());
    });
  }
}
