function solve(input) {
    let heroes = [];
    for (const line of input) {
        let [name, level, items] = line.split(' / ');
        if (items) {
            items = items.split(', ');
        } else {
            items = [];
        }
        heroes.push({ name, level: +level, items });
    }
    console.log(JSON.stringify(heroes));
}

solve(['Isacc / 25', 'Derek / 12 / BarrelVest, DestructionSword', 'Hes / 1 / Desolator, Sentinel, Antara']);
