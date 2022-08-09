class Contact {
    constructor(firstName, lastName, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this._online = false;
    }
    get online() {
        return this._online;
    }
    set online(value) {
        this._online = value;
        if (this.article) {
            if (this._online) {
                this.divTitle.classList.add('online');
            } else {
                this.divTitle.classList.remove('online');
            }
        }
    }
    render(id) {
        this.article = document.createElement('article');
        this.article.innerHTML = `
            <div class="title ${this._online && 'online'}">${this.firstName} ${
            this.lastName
        }<button>&#8505;</button></div>
            <div class="info" style="display:none">
                <span>&phone; ${this.phone}</span>
                <span>&#9993; ${this.email}</span>
            </div>`;
        this.infoBtn = this.article.querySelector('button');
        document.getElementById(id).appendChild(this.article);

        this.divTitle = this.article.querySelector('.title');

        this.infoBtn.addEventListener('click', (e) => {
            if (e.target.parentNode.parentNode.children[1].style.display === 'none') {
                e.target.parentNode.parentNode.children[1].style.display = 'block';
            } else {
                e.target.parentNode.parentNode.children[1].style.display = 'none';
            }
        });
    }
}

let contacts = [
    new Contact('Ivan', 'Ivanov', '0888 123 456', 'i.ivanov@gmail.com'),
    new Contact('Maria', 'Petrova', '0899 987 654', 'mar4eto@abv.bg'),
    new Contact('Jordan', 'Kirov', '0988 456 789', 'jordk@gmail.com'),
];
contacts.forEach((c) => c.render('main'));

// After 1 second, change the online status to true
setTimeout(() => (contacts[1].online = true), 2000);
setTimeout(() => (contacts[1].online = false), 4000);
