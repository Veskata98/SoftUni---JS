function solve(input) {
  let count = input.shift();
  let plants = {};
  for (let i = 0; i < count; i++) {
    let [plant, rarity] = input.shift().split('<->');
    plants[plant] = { rarity, rating: [] };
  }

  for (const line of input) {
    let [command, editPair] = line.split(': ');

    if (command === 'Exhibition') {
      break;
    }

    let [plantName, value] = editPair.split(' - ');

    if (!plants[plantName]) {
      console.log('error');
      continue;
    }

    switch (command) {
      case 'Rate':
        plants[plantName]['rating'].push(Number(value));
        break;
      case 'Update':
        plants[plantName]['rarity'] = value;
        break;
      case 'Reset':
        plants[plantName]['rating'] = [];
        break;
      default:
        break;
    }
  }
  console.log('Plants for the exhibition:');
  for (const plant in plants) {
    console.log(
      `- ${plant}; Rarity: ${plants[plant].rarity}; Rating: ${(plants[plant]
        .rating.length > 0
        ? plants[plant].rating.reduce((a, x) => a + x, 0) /
          plants[plant].rating.length
        : 0
      ).toFixed(2)}`
    );
  }
}

solve([
  '3',
  'Arnoldii<->4',
  'Woodii<->7',
  'Welwitschia<->2',
  'Rate: Woodii - 10',
  'Rate: sadsa - 10',
  'Rate: Welwitschia - 7',
  'Rate: Arnoldii - 3',
  'Rate: Woodii - 5',
  'Update: Woodii - 5',
  'Reset: Arnoldii',
  'Exhibition',
]);
