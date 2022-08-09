function solve(input) {
    let pass = input.shift();

    for (const line of input) {
        if (line === 'Done') {
            break;
        }

        let [command, ...options] = line.split(' ');
        switch (command) {
            case 'TakeOdd':
                pass = Array.from(pass)
                    .filter((x, i) => i % 2 !== 0)
                    .join('');
                console.log(pass);
                break;
            case 'Cut':
                let cutIndex = options[0];
                let cutLength = options[1];
                let substr = pass.substr(cutIndex, cutLength);
                pass = pass.replace(substr, '');
                console.log(pass);
                break;
            case 'Substitute':
                let replacer = options[0];
                let stringToReplace = options[1];
                let flag = false;
                while (pass.includes(replacer)) {
                    flag = true;
                    pass = pass.replace(replacer, stringToReplace);
                }

                if (!flag) {
                    console.log('Nothing to replace!');
                } else {
                    console.log(pass);
                }
                break;
            default:
                break;
        }
    }
    console.log(`Your password is: ${pass}`);
}

solve([
    'Siiceercaroetavm!:?:ahsott.:i:nstupmomceqr',
    'TakeOdd',
    'Cut 15 3',
    'Substitute :: -',
    'Substitute | ^',
    'Done',
]);
