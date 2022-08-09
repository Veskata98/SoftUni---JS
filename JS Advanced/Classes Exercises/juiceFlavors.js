function solve(input) {
    let products = {};
    let sortOrder = [];
    for (const line of input) {
        let [name, quantity] = line.split(' => ');
        quantity = Number(quantity);
        if (!products.hasOwnProperty(name)) {
            products[name] = { quantity, bottles: 0 };
        } else {
            products[name]['quantity'] += quantity;
        }
        for (const product in products) {
            while (products[product]['quantity'] >= 1000) {
                products[product]['quantity'] -= 1000;
                products[product]['bottles']++;
                sortOrder.push(product);
            }
        }
    }
    sortOrder = [...new Set(sortOrder)];
    sortOrder.forEach((x) => console.log(`${x} => ${products[x].bottles}`));
}

solve(['Orange => 2000', 'Peach => 1432', 'Banana => 450', 'Peach => 600', 'Strawberry => 549']);
