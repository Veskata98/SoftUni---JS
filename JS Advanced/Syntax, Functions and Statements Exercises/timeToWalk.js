function solve(steps, length, speed) {
    let breaks = 0;
    breaks = Math.floor(steps * length / 500);
    let secondsNeeded = Math.ceil(3600 * (steps * length / 1000) / speed);

    let date = new Date(0);
    date.setSeconds(secondsNeeded + breaks * 60);
    console.log(date.toISOString().substring(11, 19));
}

solve(2564, 0.70, 5.5);