function solve(input) {
    let words = new Map();
    let regex = /([@#])(?<firstWord>[A-Za-z]{3,})\1{2}(?<secondWord>[A-Za-z]{3,})\1/g;
    let countFound = 0;

    while ((found = regex.exec(input[0])) !== null) {
        let firstWord = found.groups.firstWord;
        let secondWord = found.groups.secondWord;

        let reversedSecondWord = secondWord.split('').reverse().join('');

        if (firstWord === reversedSecondWord) {
            words.set(firstWord, secondWord);
        }
        countFound++;
    }

    countFound ? console.log(`${countFound} word pairs found!`) : console.log('No word pairs found!');
    if (words.size > 0) {
        let res = [];
        words.forEach((x, i) => res.push(`${i} <=> ${x}`));
        console.log('The mirror words are:');
        console.log(res.join(', '));
    } else {
        console.log('No mirror words!');
    }
}

solve([
    '@mix#tix3dj#poOl##loOp#wl@@bong&song%4very$long@thong#Part##traP##@@leveL@@Level@##car#rac##tu@pack@@ckap@#rr#sAw##wAs#r#@w1r',
]);
