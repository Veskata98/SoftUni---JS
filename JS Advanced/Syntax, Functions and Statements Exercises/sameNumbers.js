function solve(n) {
    console.log(([...new Set(n.toString().split(''))].length == 1 ? true : false) + '\n' + n.toString().split('').reduce((a, x) => a + Number(x), 0));
}

solve(2222222);