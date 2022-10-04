function solve(f, s) {
    let gcd = 0;
    let bigger = f > s ? f : s;
    for (let i = 0; i < bigger; i++) {
        if (f % i == 0 && s % i == 0) {
            gcd = i;
        }
    }
    console.log(gcd);
}


solve(8, 12);
