function solve() {
  let buttonClicked = document.querySelectorAll('.product-add .add-product');
  let textAreaElement = document.querySelector('textarea');
  let checkoutElement = document.querySelector('.checkout');
  let items = [];
  let totalSum = 0;
  Array.from(buttonClicked).forEach((x) =>
    x.addEventListener('click', (e) => {
      let itemPrice = Array.from(e.target.parentNode.parentNode.children)[3]
        .textContent;
      let itemName = Array.from(e.target.parentNode.parentNode.children)[1]
        .children[0].textContent;
      let order = `Added ${itemName} for ${itemPrice} to the cart.\n`;
      if (!items.includes(itemName)) {
        items.push(itemName);
      }
      totalSum += +itemPrice;
      textAreaElement.textContent += order;
    })
  );

  checkoutElement.addEventListener('click', () => {
    textAreaElement.textContent += `You bought ${items.join(
      ', '
    )} for ${totalSum.toFixed(2)}.`;
    checkoutElement.disabled = true;
    Array.from(buttonClicked).forEach((x) => (x.disabled = true));
  });
}
