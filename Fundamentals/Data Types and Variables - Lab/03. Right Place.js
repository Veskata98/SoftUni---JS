function solve(str1, char, str2) {
    if (str1.replace('_', char) === str2) {
        console.log('Matched');
    } else {
        console.log('Not Matched');
    }
}
