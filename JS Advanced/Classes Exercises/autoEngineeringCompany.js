function solve(input) {
    let cars = {};
    for (const line of input) {
        let [car, model, soldQ] = line.split(' | ');
        soldQ = Number(soldQ);
        if (!cars.hasOwnProperty(car)) {
            cars[car] = {};
        }
        if (!cars[car].hasOwnProperty(model)) {
            cars[car][model] = soldQ;
        } else {
            cars[car][model] += soldQ;
        }
    }
    for (const car in cars) {
        console.log(car);
        Object.entries(cars[car]).forEach((x) => console.log(`###${x[0]} -> ${x[1]}`));
    }
}

solve([
    'Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10',
]);
