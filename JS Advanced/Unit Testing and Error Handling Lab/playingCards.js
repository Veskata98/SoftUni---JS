function solve(face, suit) {
  let cardFaces = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A',
  ];

  let suits = {
    S: '♠',
    H: '♥',
    D: '♦',
    C: '♣',
  };

  let obj = {
    toString() {
      if (!cardFaces.includes(face) || !suits[suit]) {
        throw new Error('Error');
      }
      return face + suits[suit];
    },
  };

  return obj;
}

solve('q', 's').toString();
