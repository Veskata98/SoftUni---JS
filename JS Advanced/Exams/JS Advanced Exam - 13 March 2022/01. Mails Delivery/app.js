function solve() {
    const inputElements = document.querySelectorAll('div.addMails > form > input,textarea');
    const listOfMails = document.getElementById('list');
    const addBtn = document.getElementById('add');
    const resetBtn = document.getElementById('reset');
    const deletedMails = document.querySelector('.delete-list');
    const sentMails = document.querySelector('.sent-list');

    addBtn.addEventListener('click', addHandler);
    resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        Array.from(inputElements).forEach((el) => (el.value = ''));
    });

    function addHandler(e) {
        e.preventDefault();
        if (Array.from(inputElements).every((el) => el.value !== '')) {
            let recepient = inputElements[0].value;
            let title = inputElements[1].value;
            let message = inputElements[2].value;
            const liElement = document.createElement('li');

            const titleElement = document.createElement('h4');
            titleElement.textContent = `Title: ${title}`;

            const recipientElement = document.createElement('h4');
            recipientElement.textContent = `Recipient Name: ${recepient}`;

            const messageElement = document.createElement('span');
            messageElement.textContent = message;

            const divActionsElement = document.createElement('div');
            divActionsElement.setAttribute('id', 'list-action');

            const sendBtn = document.createElement('button');
            sendBtn.setAttribute('type', 'submit');
            sendBtn.setAttribute('id', 'send');
            sendBtn.textContent = 'Send';

            const deleteBtn = document.createElement('button');
            deleteBtn.setAttribute('type', 'submit');
            deleteBtn.setAttribute('id', 'delete');
            deleteBtn.textContent = 'Delete';

            divActionsElement.appendChild(sendBtn);
            divActionsElement.appendChild(deleteBtn);

            liElement.appendChild(titleElement);
            liElement.appendChild(recipientElement);
            liElement.appendChild(messageElement);
            liElement.appendChild(divActionsElement);

            listOfMails.appendChild(liElement);

            deleteBtn.addEventListener('click', () => {
                const removedMailElement = document.createElement('li');
                const spanTo = document.createElement('span');
                spanTo.textContent = `To: ${recepient}`;
                const spanTitle = document.createElement('span');
                spanTitle.textContent = `Title: ${title}`;

                removedMailElement.appendChild(spanTo);
                removedMailElement.appendChild(spanTitle);

                liElement.remove();
                deletedMails.appendChild(removedMailElement);
            });

            sendBtn.addEventListener('click', () => {
                const sentMailElement = document.createElement('li');

                const spanTo = document.createElement('span');
                spanTo.textContent = `To: ${recepient}`;

                const spanTitle = document.createElement('span');
                spanTitle.textContent = `Title: ${title}`;

                const divOnSentMail = document.createElement('div');
                divOnSentMail.classList.add('btn');

                const newDelBtn = document.createElement('button');
                newDelBtn.setAttribute('type', 'submit');
                newDelBtn.classList.add('delete');
                newDelBtn.textContent = 'Delete';

                divOnSentMail.appendChild(newDelBtn);

                sentMailElement.appendChild(spanTo);
                sentMailElement.appendChild(spanTitle);
                sentMailElement.appendChild(divOnSentMail);

                liElement.remove();
                sentMails.appendChild(sentMailElement);

                newDelBtn.addEventListener('click', () => {
                    sentMailElement.querySelector('div').remove();
                    deletedMails.appendChild(sentMailElement);
                });
            });
            Array.from(inputElements).forEach((el) => (el.value = ''));
        }
    }
}
solve();
