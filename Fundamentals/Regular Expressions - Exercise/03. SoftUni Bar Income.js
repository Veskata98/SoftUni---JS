function softuniBarIncome(data) {
    let totalIncome = 0;
    for (const el of data) {
        if (el === 'end of shift') {
            break;
        }
        let regEx =
            /\%(?<name>[A-Z][a-z]+)\%([^|$%.])*?<(?<product>\w+)>([^|$%.])*?\|(?<count>\d+)\|([^|$%.])*?(?<price>\d+\.?\d+)\$/.exec(
                el
            );
        if (regEx) {
            let name = regEx.groups.name;
            let product = regEx.groups.product;
            let count = +regEx.groups.count;
            let price = +regEx.groups.price;

            totalIncome += count * price;

            console.log(`${name}: ${product} - ${(price * count).toFixed(2)}`);
        }
    }
    console.log(`Total income: ${totalIncome.toFixed(2)}`);
}
