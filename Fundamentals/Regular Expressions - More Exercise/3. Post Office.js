function postOffice(input) {
    let [firstPart, secondPart, thirdPart] = input[0].split('|');

    firstPart = /([#$%*&])(?<letters>\w+)\1/.exec(firstPart);
    let letters = firstPart.groups.letters;
    let wordsLength = [];

    for (let letter of letters) {
        let number = letter.charCodeAt();
        let regEx = new RegExp(`${number}:(?<length>[0-9]{2})`);
        let temp = regEx.exec(secondPart);
        let length = +temp.groups.length;

        wordsLength.push(length);
    }

    for (let i = 0; i < letters.length; i++) {
        let regEx = new RegExp(`(?<=\\s|^)(?<word>${letters[i]}\\S{${wordsLength[i]}})(?=\\s|$)`);
        let temp = regEx.exec(thirdPart);
        console.log(temp.groups.word);
    }
}
