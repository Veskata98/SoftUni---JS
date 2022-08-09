function solve(input) {
  let tracks = {};
  let count = input.shift();
  for (let i = 0; i < count; i++) {
    let [piece, composer, key] = input.shift().split('|');
    tracks[piece] = { composer, key };
  }

  for (const line of input) {
    let [command, piece, composer, key] = line.split('|');
    switch (command) {
      case 'Add':
        if (!tracks[piece]) {
          tracks[piece] = { composer, key };
          console.log(
            `${piece} by ${composer} in ${key} added to the collection!`
          );
        } else {
          console.log(`${piece} is already in the collection!`);
        }
        break;
      case 'Remove':
        if (tracks[piece]) {
          delete tracks[piece];
          console.log(`Successfully removed ${piece}!`);
        } else {
          console.log(
            `Invalid operation! ${piece} does not exist in the collection.`
          );
        }
        break;
      case 'ChangeKey':
        let newKey = composer;
        if (tracks[piece]) {
          tracks[piece].key = newKey;
          console.log(`Changed the key of ${piece} to ${newKey}!`);
        } else {
          console.log(
            `Invalid operation! ${piece} does not exist in the collection.`
          );
        }
        break;
      default:
        break;
    }
  }
  for (const track in tracks) {
    console.log(
      `${track} -> Composer: ${tracks[track].composer}, Key: ${tracks[track].key}`
    );
  }
}

solve([
  '3',
  'Fur Elise|Beethoven|A Minor',
  'Moonlight Sonata|Beethoven|C# Minor',
  'Clair de Lune|Debussy|C# Minor',
  'Add|Sonata No.2|Chopin|B Minor',
  'Add|Hungarian Rhapsody No.2|Liszt|C# Minor',
  'Add|Fur Elise|Beethoven|C# Minor',
  'Remove|Clair de Lune',
  'ChangeKey|Moonlight Sonata|C# Major',
  'Stop',
]);
