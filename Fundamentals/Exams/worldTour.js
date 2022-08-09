function solve(input) {
  let tour = input.shift().split('');
  for (const line of input) {
    let [command, operator1, operator2] = line.split(':');
    switch (command) {
      case 'Add Stop':
        let addIndex = operator1;
        if (tour[addIndex]) {
          tour.splice(addIndex, 0, ...operator2);
        }
        console.log(tour.join(''));
        break;
      case 'Remove Stop':
        let [removeStartIndex, removeEndIndex] = [operator1, operator2];
        if (tour[removeStartIndex] && tour[removeEndIndex]) {
          tour.splice(removeStartIndex, removeEndIndex - removeStartIndex + 1);
        }
        console.log(tour.join(''));
        break;
      case 'Switch':
        tour = tour.join('');
        let regEx = new RegExp(`${operator1}`, 'g');
        tour = tour.replace(regEx, operator2);
        tour = tour.split('');
        console.log(tour.join(''));
        break;
      default:
        break;
    }
  }
  console.log(`Ready for world tour! Planned stops: ${tour.join('')}`);
}

solve([
  'Hawai::Cyprys-Greece',
  'Add Stop:7:Rome',
  'Remove Stop:11:16',
  'Switch:Hawai:Bulgaria',
  'Travel',
]);
