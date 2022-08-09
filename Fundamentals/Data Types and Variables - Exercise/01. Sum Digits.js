function sumDigits(params) {
    console.log(
        params
            .toString()
            .split('')
            .reduce((a, b) => +a + +b)
    );
}
