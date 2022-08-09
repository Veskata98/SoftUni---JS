function solve(carParams) {
    let engines = {
        small: { power: 90, volume: 1800 },
        normal: { power: 120, volume: 2400 },
        monster: { power: 200, volume: 3500 },
    };
    let result = { model: carParams.model };
    if (carParams.power <= engines.small.power) {
        result['engine'] = engines.small;
    } else if (carParams.power <= engines.normal.power) {
        result['engine'] = engines.normal;
    } else {
        result['engine'] = engines.monster;
    }

    result['carriage'] = { type: carParams.carriage, color: carParams.color };

    let wheels = Array(4).fill(carParams.wheelsize);

    if (wheels[0] % 2 === 0) {
        wheels = wheels.map((x) => x - 1);
    }

    result['wheels'] = wheels;

    return result;
}

solve({ model: 'VW Golf II', power: 90, color: 'blue', carriage: 'hatchback', wheelsize: 14 });
