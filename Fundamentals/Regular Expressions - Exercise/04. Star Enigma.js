function starEnigma(input) {
    let count = input.shift();
    let data = {
        A: [],
        D: [],
    };
    for (let message of input) {
        let starCount = 0;
        if (/[star]/gi.test(message)) {
            starCount = message.match(/[star]/gim).length;
        }
        message = message.split('');
        for (let i = 0; i < message.length; i++) {
            message[i] = String.fromCharCode(message[i].charCodeAt() - starCount);
        }
        message = message.join('');
        message =
            /(?<=@)(?<name>[A-Za-z]*)([^@\-!:>])*?:(?<count>\d*)([^@\-!:>])*?!(?<attackType>[A|D])!([^@\-!:>])*?->(?<soldiers>\d*)/g.exec(
                message
            );
        if (message) {
            let name = message.groups.name;
            let attackType = message.groups.attackType;
            data[attackType].push(name);
        }
    }
    for (const key in data) {
        if (key === 'A') {
            console.log(`Attacked planets: ${data[key].length}`);
            data[key].sort((a, b) => a.localeCompare(b)).forEach((el) => console.log(`-> ${el}`));
        } else {
            console.log(`Destroyed planets: ${data[key].length}`);
            data[key].sort((a, b) => a.localeCompare(b)).forEach((el) => console.log(`-> ${el}`));
        }
    }
}
