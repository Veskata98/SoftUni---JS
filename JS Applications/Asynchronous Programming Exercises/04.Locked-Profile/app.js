function lockedProfile() {
    const main = document.getElementById('main');
    main.children[0].remove();

    fetch('http://localhost:3030/jsonstore/advanced/profiles')
        .then((res) => res.json())
        .then((data) =>
            Object.values(data).forEach((x, i) => {
                const personDivEl = createEl('div', '', ['class', 'profile']);
                // const personDivEl = document.createElement('div');
                // personDivEl.classList.add('profile');

                const imgEl = createEl('img', '', ['src', './iconProfile2.png', 'class', 'userIcon']);
                // const imgEl = document.createElement('img');
                // imgEl.src = './iconProfile2.png';
                // imgEl.classList.add('userIcon');

                const lockLabelEl = createEl('label', 'Lock');
                // const lockLabelEl = document.createElement('label');
                // lockLabelEl.textContent = 'Lock';

                const lockInputEl = createEl('input', '', [
                    'type',
                    'radio',
                    'name',
                    `user${i + 1}Locked`,
                    'value',
                    'lock',
                    'checked',
                    'true',
                ]);
                // const lockInputEl = document.createElement('input');
                // lockInputEl.type = 'radio';
                // lockInputEl.name = `user${i + 1}Locked`;
                // lockInputEl.value = 'lock';
                // lockInputEl.checked = true;

                const unlockLabelEl = createEl('label', 'Unlock');
                // const unlockLabelEl = document.createElement('label');
                // unlockLabelEl.textContent = 'Unlock';

                const unlockInputEl = createEl('input', '', [
                    'type',
                    'radio',
                    'name',
                    `user${i + 1}Locked`,
                    'value',
                    'unlock',
                ]);
                // const unlockInputEl = document.createElement('input');
                // unlockInputEl.type = 'radio';
                // unlockInputEl.name = `user${i + 1}Locked`;
                // unlockInputEl.value = 'unlock';

                const usernameLabelEl = createEl('label', 'Username');
                // const usernameLabelEl = document.createElement('label');
                // usernameLabelEl.textContent = 'Username';

                const usernameInputEl = createEl('input', '', [
                    'type',
                    'text',
                    'name',
                    `user${i + 1}Username`,
                    'value',
                    x.username,
                    'disabled',
                    'true',
                    'readonly',
                    'true',
                ]);
                // const usernameInputEl = document.createElement('input');
                // usernameInputEl.type = 'text';
                // usernameInputEl.name = `user${i + 1}Username`;
                // usernameInputEl.value = x.username;
                // usernameInputEl.disabled = true;
                // usernameInputEl.readOnly = true;

                const hiddenDivEl = createEl('div', '', ['class', `user${i + 1}Username`, 'hidden', true]);
                // const hiddenDivEl = document.createElement('div');
                // hiddenDivEl.classList.add(`user${i + 1}Username`);
                // hiddenDivEl.style.display = 'none';

                const emailLabelEl = createEl('label', 'Email:');
                // const emailLabelEl = document.createElement('label');
                // emailLabelEl.textContent = 'Email:';

                const emailInputEl = createEl('input', '', [
                    'type',
                    'email',
                    'name',
                    `user${i + 1}Email`,
                    'value',
                    x.email,
                    'disabled',
                    'true',
                    'readOnly',
                    'true',
                ]);
                // const emailInputEl = document.createElement('input');
                // emailInputEl.type = 'email';
                // emailInputEl.name = `user${i + 1}Email`;
                // emailInputEl.value = x.email;
                // emailInputEl.disabled = true;
                // emailInputEl.readOnly = true;

                const ageLabelEl = createEl('label', 'Age:');
                // const ageLabelEl = document.createElement('label');
                // ageLabelEl.textContent = 'Age:';

                const ageInputEl = createEl('input', '', [
                    'type',
                    'text',
                    'name',
                    `user${i + 1}Age`,
                    'value',
                    x.age,
                    'disabled',
                    'true',
                    'readOnly',
                    'true',
                ]);
                // const ageInputEl = document.createElement('input');
                // ageInputEl.type = 'text';
                // ageInputEl.name = `user${i + 1}Age`;
                // ageInputEl.value = x.age;
                // ageInputEl.disabled = true;
                // ageInputEl.readOnly = true;

                const showMoreBtn = createEl('button', 'Show more');
                // const showMoreBtn = document.createElement('button');
                // showMoreBtn.textContent = 'Show more';

                hiddenDivEl.appendChild(document.createElement('hr'));
                hiddenDivEl.appendChild(emailLabelEl);
                hiddenDivEl.appendChild(emailInputEl);
                hiddenDivEl.appendChild(ageLabelEl);
                hiddenDivEl.appendChild(ageInputEl);

                personDivEl.appendChild(imgEl);
                personDivEl.appendChild(lockLabelEl);
                personDivEl.appendChild(lockInputEl);
                personDivEl.appendChild(unlockLabelEl);
                personDivEl.appendChild(unlockInputEl);
                personDivEl.appendChild(document.createElement('br'));
                personDivEl.appendChild(document.createElement('hr'));
                personDivEl.appendChild(usernameLabelEl);
                personDivEl.appendChild(usernameInputEl);
                personDivEl.appendChild(hiddenDivEl);
                personDivEl.appendChild(showMoreBtn);

                main.appendChild(personDivEl);

                showMoreBtn.addEventListener('click', showMoreHandler);
            })
        )
        .catch((err) => console.log(err));
}

function createEl(type, content, attributes = []) {
    const element = document.createElement(type);

    content.length && (element.textContent = content);

    if (attributes.length) {
        for (let i = 0; i < attributes.length; i += 2) {
            element.setAttribute(attributes[i], attributes[i + 1]);
        }
    }
    return element;
}

function showMoreHandler(e) {
    const currentProfileEl = e.target.parentNode;
    if (!currentProfileEl.querySelector('input:first-of-type').checked) {
        if (currentProfileEl.querySelector('div:last-of-type').hidden === true) {
            currentProfileEl.querySelector('div:last-of-type').hidden = false;
            e.target.textContent = 'Hide it';
        } else {
            currentProfileEl.querySelector('div:last-of-type').hidden = true;
            e.target.textContent = 'Show more';
        }
    }
}
