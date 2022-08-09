function solve(input) {
    input.splice(0, 1);
    let regex = /\@[#]+(?<validBarcode>[A-Z][A-Za-z0-9]{4,}[A-Z])@[#]+/;
    for (const barcode of input) {
        if (regex.test(barcode)) {
            let validBarcode = regex.exec(barcode).groups.validBarcode;
            let productGroup = '00';
            let digits = validBarcode.match(/\d/g);

            if (digits) {
                productGroup = digits.reduce((a, x) => a + x);
            }
            console.log(`Product group: ${productGroup}`);
        } else {
            console.log('Invalid barcode');
        }
    }
}

solve([
    '6',
    '@###Val1d1teM@###',
    '@#ValidIteM@#',
    '##InvaliDiteM##',
    '@InvalidIteM@',
    '@#Invalid_IteM@#',
    '@#ValiditeM@#',
]);
