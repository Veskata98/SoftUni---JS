function solve(century) {
    for (let i = 1; i <= century; i++) {
        let sum = String(i)
            .split('')
            .reduce((a, b) => a + Number(b), 0);
        console.log(i + ` -> ${+sum === 5 || +sum === 7 || +sum === 11 ? 'True' : 'False'}`);
    }
}
