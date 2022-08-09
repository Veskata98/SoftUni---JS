function dictionary(input) {
    const dictionaryWords = input.shift().split(' | ');
    const examWords = input.shift().split(' | ');
    const command = input[0];

    const dictionary = {};

    for (const word of dictionaryWords) {
        const [wordName, meaning] = word.split(': ');

        if (!dictionary.hasOwnProperty(wordName)) {
            dictionary[wordName] = [];
        }

        dictionary[wordName].push(meaning);
    }

    if (command === 'Test') {
        examWords.forEach((examWord) => {
            if (dictionary.hasOwnProperty(examWord)) {
                console.log(`${examWord}:`);
                dictionary[examWord].forEach((word) => console.log(` -${word}`));
            }
        });
    } else {
        console.log(Object.keys(dictionary).join(' '));
    }
}

dictionary([
    'tackle: the equipment required for a task or sport | code: write code for a computer program | bit: a small piece, part, or quantity of something | tackle: make determined efforts to deal with a problem | bit: a short time or distance',
    'bit | code | tackle',
    'Test',
]);
