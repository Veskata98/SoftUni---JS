function matchFullName(input) {
    let exp = /\b[A-Z][a-z]+[ ][A-Z][a-z]+\b/g;
    let res = [];
    input.match(exp).forEach((element) => {
        res.push(element);
    });
    console.log(res.join(' '));
}
