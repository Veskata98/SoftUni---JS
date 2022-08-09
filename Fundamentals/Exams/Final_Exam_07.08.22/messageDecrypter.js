function messageDecrypter(input) {
    let regex = /^(\$|%)(?<tag>[A-Z][a-z]{2,})\1: \[(?<firstN>\d+)\]\|\[(?<secondN>\d+)\]\|\[(?<thirdN>\d+)\]\|$/;

    input.shift();

    for (const msg of input) {
        if (!regex.test(msg)) {
            console.log('Valid message not found!');
        } else {
            let { tag, ...numbers } = regex.exec(msg).groups;
            let numberArr = [];
            Object.values(numbers).forEach((n) => numberArr.push(String.fromCharCode(n)));
            console.log(`${tag}: ${numberArr.join('')}`);
        }
    }
}

messageDecrypter([
    '4',
    '$Request$: [73]|[115]|[105]|',
    '%Taggy$: [73]|[73]|[73]|',
    '%Taggy%: [118]|[97]|[108]|',
    '$Request$: [73]|[115]|[105]|[32]|[75]|',
]);
