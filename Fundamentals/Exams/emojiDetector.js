function solve(input) {
    let coolNumber = input[0].match(/\d/g).reduce((a, x) => a * Number(x));
    let matches = input[0].match(/([:]{2}|[*]{2})[A-Z][a-z]{2,}\1/g);

    console.log(`Cool threshold: ${coolNumber}`);
    console.log(`${matches.length} emojis found in the text. The cool ones are:`);
    matches.forEach((x) => {
        let asciiSum = x
            .slice(2, -2)
            .split('')
            .reduce((a, x) => a + x.charCodeAt(), 0);
        if (asciiSum >= coolNumber) {
            console.log(x);
        }
    });
}

solve([
    '5, 4, 3, 2, 1, go! The 1-th consecutive banana-eating contest has begun! ::Joy:: **Banana** ::Wink:: **Vali** ::valid_emoji::',
]);
