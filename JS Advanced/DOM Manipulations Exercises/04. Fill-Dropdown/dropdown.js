function addItem() {
    let textEl = document.getElementById('newItemText');
    let valueEl = document.getElementById('newItemValue');
    let optionMenuEl = document.getElementById('menu');

    let option = document.createElement('option');
    option.textContent = textEl.value;
    option.value = valueEl.value;

    optionMenuEl.appendChild(option);
    textEl.value = '';
    valueEl.value = '';
}
