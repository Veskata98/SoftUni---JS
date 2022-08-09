function solve(array, start, end) {
  if (!Array.isArray(array)) {
    return NaN;
  }

  if (start < 0) {
    start = 0;
  }
  if (!array[end]) {
    end = array.length - 1;
  }

  let sum = array
    .slice(start, end + 1)
    .map(Number)
    .reduce((a, x) => a + x, 0);

  return sum;
}

console.log(solve([2, 2, 2, 2, 2, 2, 22, 2, 2], 0, 8));
