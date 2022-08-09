function santaSecretHelper(data) {
    let subtractValue = +data.shift();
    for (let el of data) {
        if (el === 'end') {
            break;
        }
        let message = el.split('');
        for (let i = 0; i < message.length; i++) {
            message[i] = String.fromCharCode(message[i].charCodeAt() - subtractValue);
        }
        message = message.join('');
        let person = /\@(?<name>[A-Za-z]+)[^\@\-\!\:\>]*!(?<behavior>[G|N])!/gm.exec(message);
        if (person) {
            let behavior = person.groups.behavior;
            if (behavior === 'G') {
                console.log(person.groups.name);
            }
        }
    }
}
