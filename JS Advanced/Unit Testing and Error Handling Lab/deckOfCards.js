function printDeckOfCards(cards) {
    function createCard(face, suit) {
        let cardFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        let suits = {
            S: '♠',
            H: '♥',
            D: '♦',
            C: '♣',
        };

        let obj = {
            toString() {
                if (!cardFaces.includes(face) || !suits[suit]) {
                    throw new Error(`Invalid card: ${face + suit}`);
                }
                return face + suits[suit];
            },
        };
        return obj;
    }

    let result = [];

    try {
        for (let card of cards) {
            card = card.split('');
            let suit = card.pop();
            let face = card.join('');
            result.push(createCard(face, suit).toString());
        }
        console.log(result.join(' '));
    } catch (error) {
        console.log(error.message);
    }
}

printDeckOfCards(['5S', '3D', 'QD', '1C']);
