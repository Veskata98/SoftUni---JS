function matchPhoneNumber(input) {
    let regEx = /(?<=^|\s)\+359([ -])2\1\d{3}\1\d{4}\b/g;
    console.log(input[0].match(regEx).join(', '));
}
