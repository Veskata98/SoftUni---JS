function stringManipulator(input) {
    let string = input.shift();

    for (const line of input) {
        if (line === 'End') {
            break;
        }
        let [command, ...options] = line.split(' ');
        switch (command) {
            case 'Translate':
                let [char, replacement] = options;
                while (string.includes(char)) {
                    string = string.replace(char, replacement);
                }
                console.log(string);
                break;
            case 'Includes':
                let substr = options[0];
                console.log(string.includes(substr) ? 'True' : 'False');
                break;
            case 'Start':
                let startSubstr = options[0];
                console.log(string.startsWith(startSubstr) ? 'True' : 'False');
                break;
            case 'Lowercase':
                string = string.toLowerCase();
                console.log(string);
                break;
            case 'FindIndex':
                let charToFind = options[0];
                let lastIndex = string.lastIndexOf(charToFind);
                console.log(lastIndex);
                break;
            case 'Remove':
                let [startIndex, count] = options.map(Number);
                let stringToRemove = string.substring(startIndex, startIndex + count);
                string = string.replace(stringToRemove, '');
                console.log(string);
                break;
            default:
                break;
        }
    }
}

stringManipulator([
    '//Thi5 I5 MY 5trING!//',
    'Translate 5 s',
    'Includes string',
    'Start //This',
    'Lowercase',
    'FindIndex i',
    'Remove 0 10',
    'End',
]);
