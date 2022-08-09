function solve() {
  let addButton = document.getElementById('add');
  addButton.addEventListener('click', (e) => {
    e.preventDefault();

    let task = document.getElementById('task').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;

    let formIsValid = false;

    if (task && description && date) {
      formIsValid = true;
    }

    if (formIsValid) {
      let formData = `<h3>${task}</h3><p>Description: ${description}</p><p>Due Date: ${date}</p><div class="flex"><button class="green">Start</button><button class="red">Delete</button></div>`;
      let articleElement = document.createElement('article');
      articleElement.innerHTML = formData;
      let openDivElement = document.querySelector(
        'div.wrapper section:nth-of-type(2) div:last-child'
      );
      openDivElement.appendChild(articleElement);
    }

    let deleteButtons = document.querySelectorAll('button.red');
    Array.from(deleteButtons).forEach((button) =>
      button.addEventListener('click', (e) => {
        e.currentTarget.parentNode.parentNode.remove();
      })
    );

    let startButtons = document.querySelectorAll('button.green');
    Array.from(startButtons).forEach((button) =>
      button.addEventListener('click', (e) => {
        let newParent = document.querySelector('#in-progress');

        newParent.appendChild(e.currentTarget.parentNode.parentNode);

        e.currentTarget.parentNode.innerHTML =
          '<button class="red">Delete</button><button class="orange">Finish</button>';

        let deleteButtons = document.querySelectorAll('button.red');
        Array.from(deleteButtons).forEach((button) =>
          button.addEventListener('click', (e) => {
            e.currentTarget.parentNode.parentNode.remove();
          })
        );
        let finishButtons = document.querySelectorAll('button.orange');
        Array.from(finishButtons).forEach((button) =>
          button.addEventListener('click', (e) => {
            let newParent = document.querySelector(
              'div.wrapper section:nth-of-type(4) div:last-child'
            );
            newParent.appendChild(e.currentTarget.parentNode.parentNode);

            e.currentTarget.parentNode.remove();
          })
        );
      })
    );
  });
}
