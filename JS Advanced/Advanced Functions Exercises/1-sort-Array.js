function solve(a, o) {
  return o === 'asc' ? a.sort((a, b) => a - b) : a.sort((a, b) => b - a);
}

solve([14, 7, 17, 6, 8], 'asc');
