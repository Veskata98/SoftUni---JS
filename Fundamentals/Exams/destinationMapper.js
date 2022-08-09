function solve(input) {
  let matches = input.match(/([\=|\/])[A-Z]{1}[A-Za-z]{2,}\1/g);
  if (matches) {
    let destinations = [];
    matches.forEach((x) => {
      destinations.push(x.slice(1, -1));
    });
    console.log(`Destinations: ${destinations.join(', ')}`);
    console.log(
      `Travel Points: ${destinations.reduce((a, x) => a + x.length, 0)}`
    );
  } else {
    console.log('Destinations: ');
    console.log('Travel Points: 0');
  }
}

solve('=/Cyprus/==/Cyprus/==/Cyprus/=');
