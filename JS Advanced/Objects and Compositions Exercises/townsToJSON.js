function solve(input) {
    let cols = stringSplit(input.shift());
    let result = [];
    for (const line of input) {
        let data = stringSplit(line).map((x) => (isNaN(x) ? x : Number(x).toFixed(2)));
        result.push({
            [cols[0]]: data[0],
            [cols[1]]: +data[1],
            [cols[2]]: +data[2],
        });
    }

    function stringSplit(str) {
        return str.split(/\s*\|\s*/).filter(Boolean);
    }

    return JSON.stringify(result);
}

console.log(
    solve([
        '| Town | Latitude | Longitude |',
        '| Sofia | 42.696552 | 23.32601 |',
        '| Veliko Turnovo | 39.913818 | 116.363625 |',
    ])
);
