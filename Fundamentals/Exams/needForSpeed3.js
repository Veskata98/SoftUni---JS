function solve(input) {
    let carCount = +input.shift();

    let cars = {};

    for (let i = 0; i < carCount; i++) {
        let [carName, mileage, fuel] = input.shift().split('|');
        mileage = Number(mileage);
        fuel = Number(fuel);

        cars[carName] = { mileage, fuel };
    }

    input.forEach((line) => {
        let [command, carName, ...options] = line.split(' : ');
        if (command == 'Stop') {
            return;
        } else if (command == 'Drive') {
            let distance = +options[0];
            let fuelNeeded = +options[1];
            if (cars[carName].fuel >= fuelNeeded) {
                cars[carName].fuel -= fuelNeeded;
                cars[carName].mileage += distance;
                console.log(`${carName} driven for ${distance} kilometers. ${fuelNeeded} liters of fuel consumed.`);

                if (cars[carName].mileage > 100000) {
                    delete cars[carName];
                    console.log(`Time to sell the ${carName}!`);
                }
            } else {
                console.log('Not enough fuel to make that ride');
            }
        } else if (command == 'Refuel') {
            let fuelToAdd = +options[0];
            if (cars[carName].fuel + fuelToAdd > 75) {
                fuelToAdd = 75 - cars[carName].fuel;
            }
            cars[carName].fuel += fuelToAdd;
            console.log(`${carName} refueled with ${fuelToAdd} liters`);
        } else if (command == 'Revert') {
            let revertMileageValue = +options[0];
            if (cars[carName].mileage - revertMileageValue >= 10000) {
                cars[carName].mileage -= revertMileageValue;
                console.log(`${carName} mileage decreased by ${revertMileageValue} kilometers`);
            } else {
                cars[carName].mileage = 10000;
            }
        }
    });

    Object.entries(cars).forEach((x) =>
        console.log(`${x[0]} -> Mileage: ${x[1].mileage} kms, Fuel in the tank: ${x[1].fuel} lt.`)
    );
}

solve([
    '4',
    'Lamborghini Veneno|11111|74',
    'Bugatti Veyron|12345|67',
    'Koenigsegg CCXR|67890|12',
    'Aston Martin Valkryie|99900|50',
    'Drive : Koenigsegg CCXR : 382 : 82',
    'Drive : Aston Martin Valkryie : 99 : 23',
    'Drive : Aston Martin Valkryie : 2 : 1',
    'Refuel : Lamborghini Veneno : 40',
    'Revert : Bugatti Veyron : 2000',
    'Stop',
]);
