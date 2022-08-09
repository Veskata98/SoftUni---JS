function furniture(arr) {
    let sum = 0;
    console.log('Bought furniture:');
    for (const el of arr) {
        if (el === 'Purchase') {
            break;
        }
        let regEx = />>(?<name>[A-Z][A-Za-z]+)<<(?<price>\d+\.?\d+)\!(?<quantity>\d+)/;
        if (regEx.test(el)) {
            let data = regEx.exec(el);
            let name = data.groups.name;
            let price = +data.groups.price;
            let quantity = +data.groups.quantity;
            sum += price * quantity;
            console.log(name);
        }
    }
    console.log(`Total money spend: ${sum.toFixed(2)}`);
}
