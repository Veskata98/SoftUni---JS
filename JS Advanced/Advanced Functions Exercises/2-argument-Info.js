function solve(...args) {
  let types = {};
  for (const input of args) {
    let inputType = typeof input;
    console.log(`${inputType}: ${input}`);
    if (!types[inputType]) {
      types[inputType] = 0;
    }
    types[inputType]++;
  }
  Object.entries(types)
    .sort((a, b) => b[1] - a[1])
    .forEach((x) => console.log(`${x[0]} = ${x[1]}`));
}

solve('cat', 42, function () {
  console.log('Hello world!');
});
