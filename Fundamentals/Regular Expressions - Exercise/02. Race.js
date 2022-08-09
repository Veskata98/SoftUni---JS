function race(data) {
    let podium = {};
    let racers = data
        .shift()
        .split(', ')
        .forEach((racer) => {
            podium[racer] = 0;
        });
    for (const el of data) {
        if (el === 'end of race') {
            break;
        }
        let name = el.match(/([A-Za-z])/g).join('');
        let ranDist = el
            .match(/[0-9]/g)
            .map(Number)
            .reduce((a, b) => a + b);
        if (podium.hasOwnProperty(name)) {
            podium[name] += ranDist;
        }
    }
    Object.entries(podium)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .forEach((racer, index) => {
            if (index === 0) {
                console.log(`${index + 1}st place: ${racer[0]}`);
            } else if (index === 1) {
                console.log(`${index + 1}nd place: ${racer[0]}`);
            } else {
                console.log(`${index + 1}rd place: ${racer[0]}`);
            }
        });
}
