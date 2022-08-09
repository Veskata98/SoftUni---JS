function solve(number) {
    let sum = String(number)
        .split('')
        .reduce((a, b) => a + Number(b), 0);
    if (sum.toString().includes(9)) {
        console.log(`${number} Amazing? True`);
    } else {
        console.log(`${number} Amazing? False`);
    }
}
