function solve(input) {
    let msg = input.shift();
    for (const line of input) {
        if (line == 'Reveal') {
            break;
        }
        let [command, ...options] = line.split(':|:');
        if (command == 'InsertSpace') {
            let index = Number(options[0]);
            msg = msg.slice(0, index) + ' ' + msg.slice(index);
            console.log(msg);
        } else if (command == 'Reverse') {
            let subStr = options[0];
            if (msg.includes(subStr)) {
                msg = msg.replace(subStr, '') + [...subStr].reverse().join('');
                console.log(msg);
            } else {
                console.log('error');
            }
        } else if (command == 'ChangeAll') {
            let [replacer, toReplace] = options;
            while (msg.includes(replacer)) {
                msg = msg.replace(replacer, toReplace);
            }

            //With RegEx
            //msg = msg.replace(new RegExp(`[${replacer}]+`, 'g'), toReplace);

            console.log(msg);
        }
    }
    console.log(`You have a new text message: ${msg}`);
}

solve([
    'Hiware?uiy',
    'ChangeAll:|:i:|:o',
    'Reverse:|:?uoy',
    'Reverse:|:jd',
    'InsertSpace:|:3',
    'InsertSpace:|:7',
    'Reveal',
]);
