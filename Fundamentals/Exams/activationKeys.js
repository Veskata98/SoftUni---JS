// function solve(input) {
//     let key = input.shift();

//     let commands = {
//         Contains: (str) => {
//             if (key.includes(str)) {
//                 console.log(`${key} contains ${str}`);
//             } else {
//                 console.log('Substring not found!');
//             }
//         },
//         Slice: (firstIndex, lastIndex) => {
//             key = key.slice(0, firstIndex) + key.slice(lastIndex);
//             console.log(key);
//         },
//         Flip: (caseFormat, firstIndex, lastIndex) => {
//             let partOfString = key.slice(firstIndex, lastIndex);

//             caseFormat == 'Upper'
//                 ? (partOfString = partOfString.toUpperCase())
//                 : (partOfString = partOfString.toLowerCase());

//             key = key.slice(0, firstIndex) + partOfString + key.slice(lastIndex);

//             console.log(key);
//         },
//     };

//     input.forEach((line) => {
//         if (line == 'Generate') {
//             return;
//         }

//         let [command, ...args] = line.split('>>>');
//         args = args.map((x) => (isNaN(x) ? x : Number(x)));

//         commands[command](...args);
//     });

//     console.log(`Your activation key is: ${key}`);
// }

function solve(input) {
    let key = input.shift();

    for (const line of input) {
        if (line == 'Generate') {
            console.log(`Your activation key is: ${key}`);
            break;
        }
        let [command, ...options] = line.split('>>>');
        if (command == 'Contains') {
            let str = options;
            if (key.includes(str)) {
                console.log(`${key} contains ${str}`);
            } else {
                console.log('Substring not found!');
            }
        } else if (command == 'Flip') {
            let [caseFormat, firstIndex, lastIndex] = options;
            let cuttedString = key.slice(firstIndex, lastIndex);
            caseFormat == 'Upper'
                ? (cuttedString = cuttedString.toUpperCase())
                : (cuttedString = cuttedString.toLowerCase());
            key = key.slice(0, firstIndex) + cuttedString + key.slice(lastIndex);

            console.log(key);
        } else if (command == 'Slice') {
            let [firstIndex, lastIndex] = options;
            key = key.slice(0, firstIndex) + key.slice(lastIndex);

            console.log(key);
        }
    }
}

solve([
    'abcdefghijklmnopqrstuvwxyz',
    'Slice>>>2>>>6',
    'Flip>>>Upper>>>3>>>14',
    'Flip>>>Lower>>>5>>>7',
    'Contains>>>def',
    'Contains>>>deF',
    'Generate',
]);
