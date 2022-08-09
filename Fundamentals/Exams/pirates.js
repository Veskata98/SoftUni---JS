function solve(input) {
    let cities = {};
    while (input[0] !== 'Sail') {
        let [city, population, gold] = input.shift().split('||');
        population = Number(population);
        gold = Number(gold);

        if (!cities.hasOwnProperty(city)) {
            cities[city] = { population, gold };
        } else {
            cities[city]['population'] += population;
            cities[city]['gold'] += gold;
        }
    }
    input.splice(0, 1);

    while (input[0] !== 'End') {
        let [command, city, ...values] = input.shift().split('=>');
        if (command == 'Plunder') {
            let [people, gold] = values.map(Number);
            console.log(`${city} plundered! ${gold} gold stolen, ${people} citizens killed.`);
            cities[city]['population'] -= people;
            cities[city]['gold'] -= gold;
            if (Object.values(cities[city]).includes(0)) {
                delete cities[city];
                console.log(`${city} has been wiped off the map!`);
            }
        } else if (command == 'Prosper') {
            let addedGold = Number(values);
            if (addedGold < 0) {
                console.log('Gold added cannot be a negative number!');
            } else {
                cities[city]['gold'] += addedGold;
                console.log(
                    `${addedGold} gold added to the city treasury. ${city} now has ${cities[city]['gold']} gold.`
                );
            }
        }
    }
    let citiesCount = Object.keys(cities).length;
    if (citiesCount) {
        console.log(`Ahoy, Captain! There are ${citiesCount} wealthy settlements to go to:`);
        Object.entries(cities).forEach((city) =>
            console.log(`${city[0]} -> Population: ${city[1].population} citizens, Gold: ${city[1].gold} kg`)
        );
    } else {
        console.log('Ahoy, Captain! All targets have been plundered and destroyed!');
    }
}

solve([
    'Nassau||95000||1000',
    'San Juan||930000||1250',
    'Campeche||270000||690',
    'Port Royal||320000||1000',
    'Port Royal||100000||2000',
    'Sail',
    'Prosper=>Port Royal=>-200',
    'Plunder=>Nassau=>94000=>750',
    'Plunder=>Nassau=>1000=>150',
    'Plunder=>Campeche=>150000=>690',
    'End',
]);
