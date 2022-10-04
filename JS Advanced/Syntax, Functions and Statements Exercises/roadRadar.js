function solve(speed, road) {
    let roads = {
        motorway: 130,
        interstate: 90,
        city: 50,
        residential: 20,
    }
    if (speed <= roads[road]) {
        console.log(`Driving ${speed} km/h in a ${roads[road]} zone`);
    } else if (speed - roads[road] <= 20) {
        console.log(`The speed is ${speed - roads[road]} km/h faster than the allowed speed of ${roads[road]} - speeding`);
    } else if (speed - roads[road] <= 40) {
        console.log(`The speed is ${speed - roads[road]} km/h faster than the allowed speed of ${roads[road]} - excessive speeding`);
    } else {
        console.log(`The speed is ${speed - roads[road]} km/h faster than the allowed speed of ${roads[road]} - reckless driving`);
    }
}

solve(200, 'motorway');
