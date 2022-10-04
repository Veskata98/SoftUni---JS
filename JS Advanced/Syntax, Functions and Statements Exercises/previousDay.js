function solve(y, m, d) {
    let yesterday = new Date(y, m - 1, d);
    yesterday.setDate(yesterday.getDate() - 1);
    console.log(`${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`);
}

solve(2016, 10, 1);

2016 - 9 - 29