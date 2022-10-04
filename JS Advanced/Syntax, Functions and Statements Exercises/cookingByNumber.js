function solve(number, ...params) {
    let num = Number(number);

    const actions = {
        chop(num) {
            return num / 2;
        },
        dice(num) {
            return Math.sqrt(num);
        },
        spice(num) {
            return num + 1;
        },
        bake(num) {
            return num * 3;
        },
        fillet(num) {
            return num - num * 0.2;
        },
    }

    for (const op of params) {
        num = actions[op](num);
        console.log(num);
    }
}

solve('32', 'dice', 'chop', 'chop', 'chop', 'chop')