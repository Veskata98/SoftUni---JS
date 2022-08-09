function netherRealms(input) {
    let demons = {};
    let inputArr = input.split(',');
    for (let el of inputArr) {
        el = el.trim();
        let health = '';
        if (!el.includes(' ') && !el.includes(',')) {
            if (/[^\d./+\-*]/g.test(el)) {
                health = el
                    .match(/[^0-9./+\-*]/g)
                    .map((el) => (el = el.charCodeAt(el)))
                    .reduce((a, b) => a + b);
            } else {
                continue;
            }
            let eq = 0;

            if (/[+|-]?[\.]?[\d]+\.?[\d]*/g.test(el)) {
                eq = el
                    .match(/[+|-]?[\.]?[\d]+\.?[\d]*/g)
                    .map(Number)
                    .reduce((a, b) => a + b);

                if (/[*|/]/g.test(el)) {
                    let operators = el.match(/[*/]/g);
                    for (const operator of operators) {
                        if (operator === '*') {
                            eq *= 2;
                        } else {
                            eq /= 2;
                        }
                    }
                }
            }

            demons[el] = [health, eq.toFixed(2)];
        }
    }
    Object.entries(demons)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .forEach((el) => console.log(`${el[0]} - ${el[1][0]} health, ${el[1][1]} damage`));
}
